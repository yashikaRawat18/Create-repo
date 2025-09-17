import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";


export async function POST(req: NextRequest) {
  const { followerId, followingId } = await req.json();
  if (!followerId || !followingId) {
    return NextResponse.json({ error: "Missing followerId or followingId" }, { status: 400 });
  }
  // Check if already following
  const existing = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });
  if (existing) {
    // Unfollow
    await prisma.follows.delete({
      where: { followerId_followingId: { followerId, followingId } },
    });
    return NextResponse.json({ followed: false });
  } else {
    // Follow
    await prisma.follows.create({
      data: { followerId, followingId },
    });
    return NextResponse.json({ followed: true });
  }
}
