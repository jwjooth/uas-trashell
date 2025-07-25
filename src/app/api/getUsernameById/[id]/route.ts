import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const url = new URL(request.url);
    const parts = url.pathname.split("/"); // ['','api','getUsernameById','123']
    const id = parts[parts.length - 1];

    if (!id) {
      return new Response(JSON.stringify({ error: "ID not found" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

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
