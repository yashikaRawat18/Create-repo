import { NextResponse } from "next/server";


import { NextRequest } from "next/server";
import { prisma } from "../../../../../lib/prisma";


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      avatar: true,
      bio: true,
      website: true,
      followedBy: { select: { follower: { select: { id: true, username: true } } } },
      following: { select: { following: { select: { id: true, username: true } } } },
      posts: {
        select: {
          id: true,
          imageUrl: true,
          description: true,
          likes: true,
          comments: true,
        },
      },
    },
  });
  if (user && user.posts) {
    user.posts.forEach((p: any) => {
      console.log('[API profile/get] post.imageUrl:', typeof p.imageUrl, p.imageUrl && p.imageUrl.toString().slice(0, 100));
    });
  }
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user });
}
