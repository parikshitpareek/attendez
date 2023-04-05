'use client';
import MembersMain from '@/components/admin/members';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

function page() {
  const session = useSession();
  const router = useRouter();
  if (session.data?.user.admin && session.data.user.admin.members != true) {
    router.replace('/api/auth/signin');
  }
  return (
    <>
      <MembersMain />
    </>
  );
}

export default page;
