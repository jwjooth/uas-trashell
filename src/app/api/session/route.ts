import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";

export async function GET() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    const session = await decrypt(cookie);
    if (session?.userId) {
        return Response.json({ isLoggedIn: true, userId: session.userId, role: session.role, alamat: session.alamat});
    }
    return Response.json({ isLoggedIn: false });
}