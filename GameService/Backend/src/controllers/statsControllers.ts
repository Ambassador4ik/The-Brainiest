import {Context} from "hono";
import { PrismaClient } from '@prisma/client';
import axios from "axios";
import * as jwt from "jsonwebtoken";
import { getCookie } from "hono/cookie";

const prisma = new PrismaClient();


export const getWinsRating = async (c: Context) => {
    const topPlayersByWins = await prisma.user.findMany({
        take: 10,
        orderBy: [
            {
                games_won: 'desc',
            },
            {
                username: 'asc', // secondary sort by username if wins are tied
            },
        ],
        select: {
            username: true,
            games_won: true,
        },
    });

    return c.json(topPlayersByWins, 200)
}

export const getGamesRating = async (c: Context) => {
    const topPlayersByGamesPlayed = await prisma.user.findMany({
        take: 10,
        orderBy: [
            {
                games_played: 'desc',
            },
            {
                username: 'asc', // secondary sort by username if played games count are tied
            },
        ],
        select: {
            username: true,
            games_played: true,
        },
    });

    return c.json(topPlayersByGamesPlayed, 200)
}

export const getPersonalRating = async (c: Context) => {
    const token = getCookie(c, 'refreshToken')!;
    let key = (await axios.get('http://localhost:3000/token/key')).data
    if (!key) return c.json({message: 'Unable to retrieve public key'}, 503)

    try {
        const res = jwt.verify(token, key, {algorithms: ["RS256"]}) as jwt.JwtPayload
        (c as any).user = {id: res.id, username: res.username}
    } catch (error) {
        return c.json({message: error}, 500)
    }

    const rating = await prisma.user.findUnique({
        where: {
            id: Number((c as any).user.id)
        },
        select: {
            username: true,
            games_played: true,
            games_won: true
        }
    })

    return c.json(rating, 200)
}