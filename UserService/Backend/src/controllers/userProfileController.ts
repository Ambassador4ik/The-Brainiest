import {Context} from "hono";


export const getUserProfile = async (c: Context)=> {
    return c.text("Cool!")
}