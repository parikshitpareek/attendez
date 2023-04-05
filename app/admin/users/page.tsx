'use client';
import UsersMain from '@/components/admin/users';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

function page() {
  const session = useSession();
  const router = useRouter();
  if (session.data?.user.admin && session.data.user.admin.users != true) {
    router.replace('/api/auth/signin');
  }
  return (
    <>
      <UsersMain />
    </>
  );
}

export default page;
