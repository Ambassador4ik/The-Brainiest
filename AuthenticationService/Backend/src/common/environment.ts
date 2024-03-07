export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
export const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;

export const accessPublicKey = Bun.file("jwt_public_key.pem").text()
export const accessPrivateKey = Bun.file("jwt_key.pem").text()

export const refreshPublicKey = Bun.file("jwt_public_key2.pem").text()
export const refreshPrivateKey = Bun.file("jwt_key2.pem").text()