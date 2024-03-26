export const accessPublicKey = await Bun.file("jwt_public_key.pem").text()
export const accessPrivateKey = await Bun.file("jwt_key.pem").text()

export const refreshPublicKey = await Bun.file("jwt_public_key2.pem").text()
export const refreshPrivateKey = await Bun.file("jwt_key2.pem").text()