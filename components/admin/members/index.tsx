import { DownloadOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import CreateMember from './create-member';
import axios from 'axios';
import {
  createToast,
  updateErrorToast,
  updateSuccessToast,
} from '@/utils/notification';
import MembersTable from './members-table';
import AdminDataHandler from '@/utils/data-handlers/admin.handler';
import { CSVLink } from 'react-csv';
import { useSession } from 'next-auth/react';

function MembersMain() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userCreated, setUserCreated] = useState(0);
  const [fetchCount, setFetchCount] = useState(0);
  const [membersData, setMembersData] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);
  const session = useSession();
  const handleOk = async () => {
    return;
  };
  const handleCancel = async () => {
    setIsModalOpen(false);
    return;
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  //form submission
  const onFinish = async (values: any) => {
    let newToast = createToast('Creating New Member!!!');
    let data = await createMemberHandler(values);
    if (data.status == true) {
      updateSuccessToast(newToast, 'Created Member!!!');
      setUserCreated(userCreated + 1);
      setIsModalOpen(false);
      setFetchCount(fetchCount + 1);
    } else {
      updateErrorToast(newToast, data.error);
    }
    return;
  };

  const onFinishFailed = () => {};

  const createMemberHandler = async (data: any) => {
    let response = await axios.post('/api/admin/members/create-member', data);
    return response.data;
  };

  const fetchMembersData = async () => {
    setMembersLoading(true);
    let response = await axios.get('/api/admin/members/get-members');
    setMembersData(
      AdminDataHandler.membersDataHandlers(await response.data.data)
    );
    setMembersLoading(false);
    return;
  };

  const deleteMembersHandler = async (memberId: any) => {
    let deleteToast = createToast('Deleting Member');

    if (memberId == session.data?.user.memberId) {
      updateErrorToast(deleteToast, "Can't remove the self user.");
      return;
    }
    let response = await axios.get(
      `/api/admin/members/delete-member?memberId=${memberId}`
    );
    if (response.data.status == true) {
      updateSuccessToast(deleteToast, 'Deleted Successfully!!!');
      setFetchCount(fetchCount + 1);
    } else {
      updateErrorToast(deleteToast, 'Some Technical Error');
    }
    return;
  };

  useEffect(() => {
    fetchMembersData();
  }, [fetchCount]);

  return (
    <div className="rounded-lg bg-white h-[95%] shadow-md mt-5 ml-5 mr-5 overflow-y-scroll">
      <div className="header items-center border-b-black border-b-2 flex flex-row justify-between py-5 px-10 sticky top-0 z-40 bg-white">
        <div className="exportButton">
          <CSVLink data={membersData} href="" filename="members-data">
            <Button
              className="hidden md:inline-block"
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

            <Button
              className=" md:hidden"
              type="primary"
              icon={<DownloadOutlined style={{ verticalAlign: 'middle' }} />}
              size={'middle'}
              style={{
                color: 'white',
                backgroundColor: 'green',
                height: '40px',
                paddingLeft: '20px',
                paddingRight: '30px',
              }}
              onClick={() => {
                let toast = createToast('Downloading File');
                updateSuccessToast(toast, 'File Downloaded');
              }}
            ></Button>
          </CSVLink>
        </div>
        <div className="heading font-semibold md:text-3xl text-xl">Members</div>
        <div className="addButton hidden md:inline-block">
          <Button
            type="primary"
            icon={<UserAddOutlined style={{ verticalAlign: 'middle' }} />}
            size={'middle'}
            onClick={handleButtonClick}
            style={{
              color: 'white',
              backgroundColor: 'green',
              // padding: '10px',
              height: '40px',
            }}
          >
            Create Member
          </Button>
        </div>

        <div className="addButton  md:hidden">
          <Button
            type="primary"
            icon={<UserAddOutlined style={{ verticalAlign: 'middle' }} />}
            size={'middle'}
            onClick={handleButtonClick}
            style={{
              color: 'white',
              backgroundColor: 'green',
              paddingLeft: '20px',
              paddingRight: '30px',
              height: '40px',
            }}
          ></Button>
        </div>
      </div>

      <CreateMember
        onFinish={onFinish}
        created={userCreated}
        onFinishFailed={onFinishFailed}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        key="modal"
      />

      {/* <div className="border-black border-b-2 "></div> */}

      <div className="containerTable overflow-x-scroll">
        <MembersTable
          deleteMembersHandler={deleteMembersHandler}
          loading={membersLoading}
          data={membersData}
        />
      </div>
    </div>
  );
}

export default MembersMain;
