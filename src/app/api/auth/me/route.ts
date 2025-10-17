import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const store = await cookies();
  const token = store.get("auth-token");
  const user = store.get("auth-user");

  if (!token || !user || !token.value) {
    return NextResponse.json(
      { authenticated: false, error: "Sesión no válida" },
      { status: 401 },
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      name: user.value,
    },
  });
}
