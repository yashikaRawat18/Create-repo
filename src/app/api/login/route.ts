import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { cookies } from "next/headers";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }


    // Save session in cookies (Next.js 13+ - cookies() is synchronous)
    (await
      // Save session in cookies (Next.js 13+ - cookies() is synchronous)
      cookies()).set("user", JSON.stringify({ id: user.id, username: user.username }), {
      httpOnly: true,
      path: "/",
    });

    return NextResponse.json({
      message: "Login successful",
      id: user.id,
      username: user.username
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
