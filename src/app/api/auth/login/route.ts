import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { prisma } from "../../../../../lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email & password required" }, { status: 400 });
    }

    // ✅ fetch user from DB
    const user = await prisma.user.findUnique({ where: { email } });

    // ✅ check if user exists
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // ✅ compare password with bcrypt
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // ✅ generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return NextResponse.json({ message: "Login successful", token, user });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
