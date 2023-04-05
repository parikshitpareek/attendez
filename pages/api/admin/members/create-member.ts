// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    let { email, designation, name, rollNo, team, year } = req.body;

    let checkUser = await prisma.user.findUnique({ where: { email: email } });
    if (!checkUser) {
      return res.json({
        status: false,
        error: 'User Not Registered!!! Please once login from that account.',
      });
    }

    let newMember = await prisma.member.create({
      data: {
        email,
        designation,
        name,
        rollNo: parseInt(rollNo),
        team,
        year,
      },
    });

    let newUser = await prisma.user.update({
      where: { email: email },
      data: {
        admin: { create: {} },
        member: {
          connect: {
            id: newMember.id,
          },
        },
      },
    });

    return res.json({ status: true, data: { newMember, newUser } });
  } catch (e: any) {
    console.log('error in creating member', e);
    return res.send({ status: false, error: e.message });
  }
}
