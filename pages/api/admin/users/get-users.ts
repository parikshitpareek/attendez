// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    let usersData = await prisma.user.findMany({
      where: { studentId: { not: null } },
      include: { _count: { select: { Registeration: true } }, student: true },
    });

    return res.json({ status: true, data: usersData });
  } catch (e: any) {
    console.log('error in getting users', e);
    return res.send({ status: false, error: e.message });
  }
}
