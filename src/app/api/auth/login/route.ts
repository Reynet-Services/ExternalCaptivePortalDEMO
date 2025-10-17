import { NextResponse } from "next/server";

const MOCK_USER = {
  username: "demo",
  password: "demo123",
  fullName: "Demo User",
};

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (typeof username !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { error: "Debes enviar usuario y contraseña" },
        { status: 400 },
      );
    }

    const isValid =
      username === MOCK_USER.username && password === MOCK_USER.password;

    if (!isValid) {
      return NextResponse.json(
        { error: "Usuario o contraseña inválidos" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({
      message: "Autenticado",
      user: {
        username: MOCK_USER.username,
        name: MOCK_USER.fullName,
      },
    });

    response.cookies.set({
      name: "auth-token",
      value: Buffer.from(`${MOCK_USER.username}:${Date.now()}`).toString("base64"),
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    response.cookies.set({
      name: "auth-user",
      value: MOCK_USER.fullName,
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json(
      { error: "No pudimos procesar el inicio de sesión" },
      { status: 500 },
    );
  }
}
