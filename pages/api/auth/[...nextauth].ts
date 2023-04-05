import NextAuth, { NextAuthOptions } from 'next-auth';
import google from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user }) {
      // if (!user.email?.includes('@chitkara.edu.in')) {
      //   return false;
      // }
      console.log('user', user);
      return true;
    },
    async session({ session, user }) {
      let userData = await prisma.user.findUnique({
        where: { email: user.email || '' },
        include: {
          member: { select: { name: true, designation: true, team: true } },
          admin: true,
        },
      });

      session = {
        ...session,
        user: userData,
      };
      return session;
    },
  },
  providers: [
    google({
      clientId: process.env.GOOGLE_OUTH_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_OUTH_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
};

export { authOptions };

export default NextAuth(authOptions);
