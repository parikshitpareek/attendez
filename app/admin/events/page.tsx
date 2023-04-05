'use client';
import EventsMain from '@/components/admin/events';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

function page() {
  const session = useSession();
  const router = useRouter();
  if (session.data?.user.admin && session.data.user.admin.events != true) {
    router.replace('/api/auth/signin');
  }
  return (
    <>
      <EventsMain />
    </>
  );
}

export default page;
