import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// GET: fetch all stories from users except expired ones (older than 24h)
export async function GET(req: NextRequest) {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const stories = await prisma.story.findMany({
    where: { createdAt: { gte: cutoff } },
    select: {
      id: true,
      userId: true,
      imageUrl: true,
      createdAt: true,
      user: { select: { username: true, avatar: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ stories });
}

// POST: add a new story
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const userId = formData.get("userId") as string;
  const image = formData.get("image");
  if (!userId || !image || typeof image === "string") {
    return NextResponse.json({ error: "Missing userId or image" }, { status: 400 });
  }
  // Save image to /public/stories
  const buffer = Buffer.from(await image.arrayBuffer());
  const filename = `${Date.now()}_${userId}.jpg`;
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(process.cwd(), "public", "stories", filename);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, buffer);
  const imageUrl = `/stories/${filename}`;
  // Save story in DB
  const story = await prisma.story.create({
    data: { userId, imageUrl },
  });
  return NextResponse.json({ story });
}
