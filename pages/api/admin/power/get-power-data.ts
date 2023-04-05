// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    let adminPowerData = await prisma.user.findMany({
      where: { adminId: { not: null } },
      include: { admin: true },
    });

    return res.json({ status: true, data: adminPowerData });
  } catch (e: any) {
    console.log('error in getting member', e);
    return res.send({ status: false, error: e.message });
  }
}
