'use client';
import BouncerMain from '@/components/admin/bouncer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

function page() {
  const session = useSession();
  const router = useRouter();
  if (session.data?.user.admin && session.data.user.admin.bouncer != true) {
    router.replace('/api/auth/signin');
  }
  return (
    <>
      <BouncerMain />
    </>
  );
}

export default page;
