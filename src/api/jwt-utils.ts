import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "@hapi/hapi";
import dotenv from "dotenv";
import { db } from "../models/db.js";
import { userType } from "../types/gymmark-types.js";

dotenv.config();

const cookiePassword = process.env.cookie_password as string;

interface TokenPayload {
  id: string;
  email: string;
}

export function createToken(user: userType): string {
  const payload: TokenPayload = {
    id: user._id,
    email: user.email,
  };
  const options: jwt.SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return jwt.sign(payload, cookiePassword, options);
}

export function decodeToken(token: string): { userId: string | null; email: string | null } {
  const userInfo: { userId: string | null; email: string | null } = {
    userId: null,
    email: null,
  };

  try {
    const decoded = jwt.verify(token, cookiePassword) as JwtPayload;
    userInfo.userId = decoded.id;
    userInfo.email = decoded.email;
  } catch (e: any) {
    console.log(e.message);
  }
  return userInfo;
}

export async function validate(decoded: JwtPayload, request: Request): Promise<{ isValid: boolean; credentials?: userType }> {
  const user = await db.userStore.getUserById(decoded.id);
  if (!user) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user };
}
