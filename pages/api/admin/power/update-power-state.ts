// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    let queryData: any = req.query;

    let updateChange: any = {};
    updateChange[`${queryData.updateStateType}`] =
      queryData.updateState == 'false' ? false : true;
    let updatedAdmin = await prisma.admin.update({
      where: { id: parseInt(queryData.adminId) },
      data: { ...updateChange },
    });

    return res.json({ status: true, data: updatedAdmin });
  } catch (e: any) {
    console.log('error in updating admin', e);
    return res.send({ status: false, error: e.message });
  }
}
