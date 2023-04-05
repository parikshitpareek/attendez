import { Dropdown, MenuProps, Skeleton } from 'antd';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

function Navbar() {
  const session = useSession();

  const signOutHandler = () => {
    signOut();
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: <button>Logout</button>,
      onClick: () => {
        signOutHandler();
      },
    },
  ];
  return (
    <div className="sticky top-0 flex flex-row justify-between items-center py-4 shadow-md w-full px-8">
      <div></div>
      <div className="left flex flex-row space-x-2 items-center">
        <div
          className="title text-gfg text-lg md:text-2xl
         font-bold"
        >
          ADMIN DASHBOARD
        </div>
      </div>

      {session.status == 'loading' && (
        <Skeleton
          active={true}
          avatar={true}
          className="max-w-[15%]"
          title={false}
          paragraph={{ rows: 2 }}
        />
      )}

      {session.status == 'authenticated' && (
        <div className="right flex flex-row items-center  space-x-2">
          <div className="avatar">
            <img
              src={session.data?.user.image}
              className="h-12 w-12 rounded-full"
            ></img>
          </div>
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            placement="bottomRight"
            arrow
          >
            <div className="flex flex-col justify-center cursor-pointer items-center">
              <div className="upper">
                {(session.data?.user.member &&
                  session.data?.user.member.name) ||
                  'name'}
              </div>
              <div className="lower text-sm">
                {(session.data?.user.member &&
                  session.data?.user.member.team) ||
                  'team'}
                &nbsp;
                {(session.data?.user.member &&
                  session.data?.user.member.designation) ||
                  'designation'}
              </div>
            </div>
          </Dropdown>
        </div>
      )}
    </div>
  );
}

export default Navbar;
