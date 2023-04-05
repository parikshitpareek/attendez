// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    let { eventId, status }: any = req.query;
    let updatedEvent = await prisma.event.update({
      where: { id: parseInt(eventId) },
      data: { open: status == 'true' ? true : false },
    });
    return res.json({ status: true, data: updatedEvent });
  } catch (e: any) {
    console.log('error in creating member', e);
    return res.send({ status: false, error: e.message });
  }
}
