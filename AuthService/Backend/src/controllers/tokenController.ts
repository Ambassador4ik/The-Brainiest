import { Context } from 'hono';
import { PrismaClient } from '@prisma/client';
import { verify, TokenExpiredError } from 'jsonwebtoken';
import { getAccessToken, getRefreshToken } from '../common/jwtWorkers';
import { accessPublicKey, refreshPublicKey } from '../common/environment'

const prisma = new PrismaClient();

export const refreshTokens = async (c: Context) => {
    const refreshToken = c.req.header('Authorization')?.split(' ')[1];

    if (!refreshToken) return c.json({ message: 'Access Denied' }, 401);

    const refreshTokenRecord = await prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        select: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    });

    // Extract the user from the refreshTokenRecord
    const user = refreshTokenRecord ? refreshTokenRecord.user : null;

    if (!user) return c.json({ message: 'Invalid Refresh Token' }, 401);

    try {
        const verified = verify(refreshToken, refreshPublicKey, { algorithms: ['RS256'] });
        const accessToken = await getAccessToken(user);
        const newRefreshToken = await getRefreshToken(user);

        await prisma.refreshToken.update({
            where: {
                token: refreshToken,
            },
            data: {
                token: newRefreshToken
            }
        })

        return c.json({
            message: 'Tokens successfully refreshed.',
            accessToken: accessToken,
            refreshToken: newRefreshToken
        }, 200)
    } catch (error) {
        return c.json({ message: 'Invalid Refresh Token' }, 403);
    }
}

export const verifyAccessToken = async (c: Context)=> {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];

    if (!accessToken) return c.json({ message: 'Access Denied' }, 401);

    try {
        const verified = verify(accessToken, accessPublicKey, { algorithms: ['RS256'] });
        return c.json({message: 'Authorised'}, 200);
    } catch (error) {
        if (error instanceof TokenExpiredError) return c.json({ message: 'Token Expired' }, 403);
        return c.json({ message: 'Invalid Token' }, 401);
    }
}

export const getPublicKey = async (c: Context) => {
    return c.text(refreshPublicKey);
}