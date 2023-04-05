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
import PowersTable from './power-table';

function PowerMain() {
  const [powerData, setPowerData] = useState([]);
  const [powerFetchCount, setPowerFetchCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const powerDataFetcher = async () => {
    setLoading(true);
    let response = await axios.get('/api/admin/power/get-power-data');
    let data = AdminDataHandler.powersDataHandler(response.data.data);
    setPowerData(data);
    setLoading(false);
    return;
  };

  const powerUpdateHandler = async (
    adminId: number,
    name: string,
    updateState: boolean,
    updateStateType: string
  ) => {
    let powerUpdateToast = createToast(
      updateState == true
        ? `Enabling ${updateStateType} power of ${name}`
        : `Disabling ${updateStateType} power of ${name}`
    );

    let response = await axios.get(
      `/api/admin/power/update-power-state?adminId=${adminId}&updateState=${updateState}&updateStateType=${updateStateType}`
    );

    if (response.data.status == true) {
      updateSuccessToast(
        powerUpdateToast,
        updateState == true
          ? `Enabled ${updateStateType} powers of ${name}`
          : `Disabled ${updateStateType} powers of ${name}`
      );
      setPowerFetchCount(powerFetchCount + 1);
    } else {
      updateErrorToast(powerUpdateToast, response.data.error);
    }
    return;
  };

  useEffect(() => {
    powerDataFetcher();
  }, [powerFetchCount]);

  return (
    <div className="rounded-lg bg-white h-[95%] shadow-md mt-5 ml-5 mr-5 overflow-y-scroll">
      <div className="header border-b-black border-b-2 flex flex-row justify-between items-center py-5 px-10 sticky top-0 z-40 bg-white">
        <div className="exportButton">
          <CSVLink data={powerData} href="" filename="power-data">
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
        <div className="heading font-semibold md:text-3xl text-xl">Powers</div>
        <div className="addButton md:w-40"></div>
      </div>

      {/* <div className="border-black border-b-2 "></div> */}

      <div className="containerTable overflow-x-scroll">
        <PowersTable
          powerUpdateHandler={powerUpdateHandler}
          loading={loading}
          data={powerData}
        />
      </div>
    </div>
  );
}

export default PowerMain;
