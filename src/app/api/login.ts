import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user && user.password === password) {
      return res.status(200).json({ id: user.id, username: user.username });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  }
  res.status(405).end();
}
