import prisma from "../../utils/prismaClient";
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { userId, type, question, answer } = req.body;

  const test = await prisma.test.create({
    data: { userId, type, question, answer },
  });

  res.json(test);
}