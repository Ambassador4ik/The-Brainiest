import { Context, Next } from 'hono';
import { getCookie, setCookie } from "hono/cookie";
import axios, {AxiosError} from 'axios';
import * as jwt from 'jsonwebtoken'

const attachUserData = async (c: Context, token: string) => {
    let key = (await axios.get('http://localhost:3000/token/key')).data
    if (!key) return c.json({message: 'Unable to retrieve public key'}, 503)

    try {
        const res = jwt.verify(token, key, {algorithms: ["RS256"]}) as jwt.JwtPayload
        (c as any).user = {id: res.id, username: res.username}
    } catch (error) {
        return c.json({message: error}, 500)
    }
}

export const verifyToken = async (c: Context, next: Next) => {
    const accessToken = getCookie(c, 'accessToken');
    const refreshToken = getCookie(c, 'refreshToken');

    // No refresh token presented, user must be logged out
    if (!refreshToken) {
        return c.json({
            message: 'No tokens presented in cookie'
        }, 401)
    }

    // No access token presented, but refresh token presented, new access token must be generated
    if (!accessToken) {
        await getNewAccessToken(c, next)
        return;
    }

    const res = await axios.post('http://localhost:3000/token/verify', {}, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (res.status === 200) {
        await attachUserData(c, refreshToken)
        await next(); // Continue to the next middleware or route handler
    } else {
        // Access token expired or invalid, new must be generated
        await getNewAccessToken(c, next)
        return;
    }
};

export const getNewAccessToken = async (c: Context, next: Next) => {
    const refreshToken = getCookie(c, 'refreshToken');

    const res = await axios.post('http://localhost:3000/token/refresh', {}, {
        headers: { Authorization: `Bearer ${refreshToken}` }
    });

    const data = await res.data

    if (res.status === 200 && data.refreshToken && data.accessToken) {
        setCookie(c,'refreshToken', data.refreshToken, {
            httpOnly: true,
            //secure: true, // Ensure this is set to false if you're testing without HTTPS
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            //sameSite: 'Strict',
            domain: 'localhost',
        });

        // Optionally, set access token as httpOnly cookie (or send it in response body for SPA usage)
        setCookie(c, 'accessToken', data.accessToken, {
            httpOnly: true,
            //secure: true, // Ensure this is set to false if you're testing without HTTPS
            path: '/',
            maxAge: 60 * 60, // 1h
            //sameSite: 'Strict',
            domain: 'localhost',
        });
        await attachUserData(c, data.refreshToken);

        await next(); // New tokens were successfully generated, user authorised
    } else {
        // Unable to generate new tokens, user must be logged out
        return c.json({
            message: 'Unable to refresh tokens'
        }, 401)
    }
}