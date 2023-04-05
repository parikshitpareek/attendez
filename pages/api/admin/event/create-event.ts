// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    let { title, description, date, capacity, poster, eventType } = req.body;

    date = moment(date).utc().toDate();
    capacity = parseInt(capacity);

    let newEvent = await prisma.event.create({
      data: {
        title,
        description,
        capacity,
        date,
        eventType,
        poster,
      },
    });

    return res.json({ status: true, data: newEvent });
  } catch (e: any) {
    console.log('error in creating member', e);
    return res.send({ status: false, error: e.message });
  }
}
