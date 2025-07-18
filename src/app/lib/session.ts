import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;

if (!secretKey) {
    throw new Error("SESSION_SECRET environment variable is not set.");
}
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string, role: string, alamat: string) {
    const expiresAt = new Date(Date.now() + 7 * 60 * 60 *1000);
    const session = await encrypt({userId, expiresAt, role, alamat});

    const cookieStore = await cookies();
    cookieStore.set("session", session,{
        httpOnly: true,
        secure: true,
        expires: expiresAt,
    });
} 
export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}
type SessionPayload = {
    userId: string;
    role: string;
    alamat: string;
    expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
        algorithms: ["HS256"],
    });
        return payload;
    } catch (error) {
        console.log("Failed to verify session");
    }
}