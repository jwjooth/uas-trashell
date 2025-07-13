import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
  const { id } = params; // ✅ perbaikan: tidak perlu pakai await

    try {
    const res = await fetch(
        `https://686213cb96f0cc4e34b83a3f.mockapi.io/api/v1/users/${id}`,
        {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
        },
    }
    );

    if (!res.ok) {
        return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
    });
    }

    const user = await res.json();

    return new Response(JSON.stringify({ nama: user.nama }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
} catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
    });
}
}