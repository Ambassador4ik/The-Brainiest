import {Context} from "hono";
import {getCookie} from "hono/cookie";
import axios from "axios";
import * as jwt from 'jsonwebtoken'
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const getUserProfile = async (c: Context)=> {
    try {
        const token = getCookie(c, 'refreshToken')
        if (!token) return c.json({message: 'Unauthorised'}, 401)

        let key = (await axios.get('http://localhost:3000/token/key')).data
        if (!key) return c.json({message: 'Unable to retrieve public key'}, 503)

        const res = jwt.verify(token, key, {algorithms: ["RS256"]}) as jwt.JwtPayload

        const user = await prisma.user.findUnique({
            where: {
                id: res.id
            },
            select: {
                id: true,
                username: true,
                creation_date: true,
                profile_picture: true
            }
        })

        return c.json(user, 200)

    } catch (error) {
        return c.json({message: error}, 500)
    }
}