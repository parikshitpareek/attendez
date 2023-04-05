// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    let queryData: any = req.query;

    let updatedUser = await prisma.user.update({
      where: { id: parseInt(queryData.userId) },
      data: { active: queryData.state == 'true' ? true : false },
    });

    return res.json({ status: true, data: updatedUser });
  } catch (e: any) {
    console.log('error in updating users', e);
    return res.send({ status: false, error: e.message });
  }
}
