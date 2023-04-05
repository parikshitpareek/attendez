import AdminDataHandler from '@/utils/data-handlers/admin.handler';
import {
  createToast,
  updateErrorToast,
  updateSuccessToast,
} from '@/utils/notification';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import UsersTable from './users-table';

function UsersMain() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userFetchCount, setUserFetchCount] = useState(0);

  const usersDataFetcher = async () => {
    let response = await axios.get('/api/admin/users/get-users');
    setUsersData(AdminDataHandler.usersDataHandler(response.data.data));
    setLoading(false);
    return;
  };

  const updateUserHandler = () => {};

  const updateUserState = async (updateState: boolean, userId: any) => {
    let updateStateToast = createToast(
      updateState == true ? 'Enabling User Access' : 'Disabling User Access'
    );
    let response = await axios.get(
      `/api/admin/users/update-state?userId=${userId}&state=${updateState}`
    );
    let data = await response.data;

    if (data.status == true) {
      setUserFetchCount(userFetchCount + 1);

      updateSuccessToast(
        updateStateToast,
        updateState == true ? 'Enabled User Access' : 'Disabled User Access'
      );
    } else {
      updateErrorToast(updateStateToast, data.error);
    }
    return;
  };

  useEffect(() => {
    usersDataFetcher();
  }, [userFetchCount]);
  return (
    <div className="rounded-lg bg-white h-[95%] shadow-md mt-5 ml-5 mr-5 overflow-y-scroll">
      <div className="header border-b-black border-b-2 flex flex-row justify-between items-center py-5 px-10 sticky top-0 z-40 bg-white">
        <div className="exportButton text-center">
          <CSVLink data={usersData} filename="users-data">
            <Button
              type="primary"
              icon={<DownloadOutlined style={{ verticalAlign: 'middle' }} />}
              size={'middle'}
              style={{
                color: 'white',
                backgroundColor: 'green',
                height: '40px',
              }}
              onClick={() => {
                let toast = createToast('Downloading File');
                updateSuccessToast(toast, 'File Downloaded');
              }}
            >
              Download
            </Button>
          </CSVLink>
        </div>
        <div className="heading font-semibold md:text-3xl text-lg">Users</div>
        <div className="addButton md:w-40"></div>
      </div>

      {/* <div className="border-black border-b-2 "></div> */}

      <div className="containerTable overflow-x-scroll">
        {/* <MembersTable
          deleteMembersHandler={deleteMembersHandler}
          loading={membersLoading}
          data={membersData}
        /> */}

        <UsersTable
          updateUserState={updateUserState}
          data={usersData}
          loading={loading}
          updateUserHandler={updateUserHandler}
          key="table"
        />
      </div>
    </div>
  );
}

export default UsersMain;
