import * as jwt from "jsonwebtoken";

export const generateToken = async (payload: object) => {
    return await jwt.sign(payload, process.env.JWT_SECRET_KEY as string, { expiresIn: "10d" })
}
export const decodedToken = async (token: string) => {
    return await jwt.verify(token, process.env.JWT_SECRET_KEY as string)
}