import { NextResponse } from "next/server";

import { writeFile } from "fs/promises";
import path from "path";
import { prisma } from "../../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const website = formData.get("website") as string;
    const file = formData.get("avatar");

    let avatarUrl = formData.get("currentAvatar") as string;
    if (file && typeof file !== "string") {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `avatar_${id}_${Date.now()}` + path.extname(file.name);
      const uploadPath = path.join(process.cwd(), "public", filename);
      await writeFile(uploadPath, buffer);
      avatarUrl = "/" + filename;
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        bio,
        website,
        avatar: avatarUrl,
      },
    });
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Profile update failed" }, { status: 500 });
  }
}
