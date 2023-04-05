'use client';
import ContactsMain from '@/components/admin/contacts';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

function page() {
  const session = useSession();
  const router = useRouter();
  if (session.data?.user.admin && session.data.user.admin.contacts != true) {
    router.replace('/api/auth/signin');
  }
  return (
    <>
      <ContactsMain />
    </>
  );
}

export default page;
