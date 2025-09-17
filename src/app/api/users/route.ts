import { NextResponse } from "next/server";

import { NextRequest } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const excludeId = searchParams.get("excludeId");
  let currentUserFollowing: string[] = [];
  if (excludeId) {
    // Get all user IDs the current user is following
    const following = await prisma.follows.findMany({
      where: { followerId: excludeId },
      select: { followingId: true },
    });
    currentUserFollowing = following.map(f => f.followingId);
  }
  const users = await prisma.user.findMany({
    where: excludeId ? { id: { not: excludeId } } : {},
    select: { id: true, username: true, avatar: true, bio: true },
  });
  // Add isFollowing property for each user
  const usersWithFollow = users.map(u => ({
    ...u,
    isFollowing: excludeId ? currentUserFollowing.includes(u.id) : false,
  }));
  return NextResponse.json({ users: usersWithFollow });
}
