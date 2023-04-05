import AdminDataHandler from '@/utils/data-handlers/admin.handler';
import { createToast, updateSuccessToast } from '@/utils/notification';
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import ContactsTable from './contacts-table';

function ContactsMain() {
  const [contactsData, setContactsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const contactDataFetcher = async () => {
    setLoading(true);
    let response = await axios.get('/api/admin/contacts/get-contacts');
    let data = AdminDataHandler.contactsDataHandler(await response.data.data);
    setContactsData(data);
    setLoading(false);
    return;
  };

  useEffect(() => {
    contactDataFetcher();
  }, []);
  return (
    <div className="rounded-lg bg-white h-[95%] shadow-md mt-5 ml-5 mr-5 overflow-y-scroll">
      <div className="header border-b-black border-b-2 flex flex-row justify-between items-center py-5 px-10 sticky top-0 z-40 bg-white">
        <div className="exportButton">
          <CSVLink data={contactsData} href="" filename="contacts-data">
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
        <div className="heading font-semibold text-xl md:text-3xl">
          Contacts
        </div>
        <div className="addButton md:w-40"></div>
      </div>

      {/* <div className="border-black border-b-2 "></div> */}

      <div className="containerTable overflow-x-scroll">
        <ContactsTable loading={loading} data={contactsData} />
      </div>
    </div>
  );
}

export default ContactsMain;
