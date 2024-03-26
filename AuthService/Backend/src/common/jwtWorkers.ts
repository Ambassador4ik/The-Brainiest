import * as jwt from 'jsonwebtoken'
import { accessPrivateKey, refreshPrivateKey } from './environment'

export const getAccessToken = async (user: Object) => {
    return jwt.sign(user, accessPrivateKey, {algorithm: "RS256", expiresIn: "1h"})
}

export const getRefreshToken = async (user: Object) => {
    return jwt.sign(user, refreshPrivateKey, {algorithm: "RS256", expiresIn: "30d"})
}
