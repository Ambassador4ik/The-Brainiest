import { Context } from 'hono';

export const loginUser = async (c: Context) => {
    c.status(201)
    return c.text("Login!")
};

export const registerUser = async (c: Context) => {
    return c.text("Register!")
};