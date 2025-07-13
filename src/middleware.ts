import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session";
const protectedRoutes = ["/checkout", "/dashboard"];
const protectedRoleRoutes = ["/dashboard"];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isProtectedRoleRoute = protectedRoleRoutes.some(route => path.startsWith(route));
    const isPublicRoute = publicRoutes.includes(path);

    const cookieStore = await cookies();
    const cookie = cookieStore.get("session")?.value;
    const session = await decrypt(cookie);

    if (isProtectedRoute && (!session || !session.userId)){
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    if (isProtectedRoleRoute && session?.role !== "penjual") {
        return NextResponse.redirect(new URL("/home", req.nextUrl));
    }
    if (isPublicRoute && session?.userId){
        return NextResponse.redirect(new URL("/home", req.nextUrl));
    }
    return NextResponse.next();
};