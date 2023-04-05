'use client';
import PowerMain from '@/components/admin/power';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

function page() {
  const session = useSession();
  const router = useRouter();
  if (session.data?.user.admin && session.data.user.admin.superadmin != true) {
    router.replace('/api/auth/signin');
  }
  return (
    <>
      <PowerMain />
    </>
  );
}

export default page;
