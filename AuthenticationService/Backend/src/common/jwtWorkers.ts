import * as jwt from 'jsonwebtoken'
import { accessPrivateKey, refreshPrivateKey } from './environment'

export const getAccessToken = async (user: Object) => {
    return jwt.sign(user, await accessPrivateKey, {algorithm: "RS256", expiresIn: "1h"})
}

export const getRefreshToken = async (user: Object) => {
    return jwt.sign(user, await refreshPrivateKey, {algorithm: "RS256", expiresIn: "30d"})
}
