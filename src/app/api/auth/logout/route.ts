import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Sesión finalizada" });

  response.cookies.set({
    name: "auth-token",
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  response.cookies.set({
    name: "auth-user",
    value: "",
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
