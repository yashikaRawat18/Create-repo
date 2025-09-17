export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import path from "path";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId");
    const description = formData.get("description");
    const imageFile = formData.get("image"); // should be a File/Blob

    if (!userId || !description || !imageFile || typeof imageFile === 'string') {
      return NextResponse.json({ error: "Missing required fields or invalid image" }, { status: 400 });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId as string } });
    if (!user) {
      console.error("POST /api/post/create error: userId does not exist", userId);
      return NextResponse.json({ error: "User does not exist" }, { status: 400 });
    }

    // Save image to /public/uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    // Try to get extension from file name, fallback to png
    let ext = 'png';
    if (typeof (imageFile as any).name === 'string') {
      const nameParts = (imageFile as any).name.split('.');
      if (nameParts.length > 1) ext = nameParts.pop() || 'png';
    }
    const filename = `${uuidv4()}.${ext}`;
    const filepath = path.join(uploadsDir, filename);
    const arrayBuffer = await (imageFile as File).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(filepath, buffer);
    const imageUrl = `/uploads/${filename}`;
    console.log('[API post/create] imageUrl:', imageUrl, 'ext:', ext, 'fileName:', (imageFile as any).name);
    

    const post = await prisma.post.create({
      data: {
        id: uuidv4(),
        imageUrl,
        description: description as string,
        userId: userId as string,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("POST /api/post/create error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

