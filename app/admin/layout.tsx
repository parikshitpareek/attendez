'use client';
import Footer from '@/components/admin/common/footer';
import Navbar from '@/components/admin/common/navbar';
import Sidebar from '@/components/admin/common/sidebar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession({ required: true });
  const router = useRouter();

  if (session.status == 'authenticated') {
    if (session.data.user.adminId == null) {
      router.replace('/api/auth/signin');
    }
  }

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <body className="">
        <Toaster />
        <div className="flex flex-row">
          <div className="w-[18%] md:block hidden">
            <Sidebar />
          </div>
          <div className="flex flex-col w-[100%] h-screen">
            <Navbar />
            <div className="bg-[#f3f4f6] h-[90%] overflow-y-scroll">
              {children}
            </div>

            <div className="md:hidden">
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
