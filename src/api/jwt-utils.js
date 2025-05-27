import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../models/db.js";
dotenv.config();
const cookiePassword = process.env.cookie_password;
export function createToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
    };
    const options = {
        algorithm: "HS256",
        expiresIn: "1h",
    };
    return jwt.sign(payload, cookiePassword, options);
}
export function decodeToken(token) {
    const userInfo = {
        userId: null,
        email: null,
    };
    try {
        const decoded = jwt.verify(token, cookiePassword);
        userInfo.userId = decoded.id;
        userInfo.email = decoded.email;
    }
    catch (e) {
        console.log(e.message);
    }
    return userInfo;
}
export async function validate(decoded, request) {
    const user = await db.userStore.getUserById(decoded.id);
    if (!user) {
        return { isValid: false };
    }
    return { isValid: true, credentials: user };
}
