// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    let queryData: any = req.query;

    let checkUser = await prisma.user.findFirst({
      where: { memberId: parseInt(queryData.memberId) },
    });

    let updatedUser = await prisma.user.updateMany({
      where: { memberId: parseInt(queryData.memberId) },
      data: { memberId: null, adminId: null },
    });

    await prisma.admin.delete({ where: { id: checkUser?.id } });

    await prisma.member.delete({ where: { id: parseInt(queryData.memberId) } });

    return res.json({ status: true, data: updatedUser });
  } catch (e: any) {
    console.log('error in deleting member', e);
    return res.send({ status: false, error: e.message });
  }
}
