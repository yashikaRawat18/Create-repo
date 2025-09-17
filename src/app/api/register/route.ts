import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/prisma";


export async function POST(req: Request) {
  try {
  const { email, username, password, confirmPassword, name, phone } = await req.json();
    // Password match validation
    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    if (!email || !username || !password || !name || !phone) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Email format validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Phone number validation: numbers only, 10 digits
    if (!/^[0-9]{10}$/.test(phone)) {
      return NextResponse.json({ error: "Phone number must be exactly 10 digits" }, { status: 400 });
    }

    // Username and email uniqueness check
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Actually create the user in the DB
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name,
        phone,
      },
    });

    return NextResponse.json({ message: "User registered", user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
