import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import Highlighter from 'react-highlight-words';

interface DataType {
  key: string;
  name: string;
  email: string;
  memberId: number;
  members: boolean;
  users: boolean;
  events: boolean;
  contact: boolean;
  form: boolean;
}

type DataIndex = keyof DataType;

const PowersTable = ({
  data,
  loading,
  powerUpdateHandler,
}: {
  data: any;
  loading: boolean;
  powerUpdateHandler: Function;
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined style={{ verticalAlign: 'middle' }} />}
            size="small"
            style={{
              width: 90,
              color: 'white',
              backgroundColor: 'green',
              // padding: '10px',
              // height: '40px',
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Sno',
      dataIndex: 'sno',
      key: 'sno',
      width: '5%',
      align: 'center',
    },
    {
      title: 'Member Id',
      dataIndex: 'memberId',
      key: 'memberId',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
      ...getColumnSearchProps('name'),
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '15%',
      ...getColumnSearchProps('email'),
      align: 'center',
    },
    {
      title: 'Members',
      dataIndex: '',
      key: 'members',
      width: '15%',
      align: 'center',
      render: (data) => {
        return data.members == true ? (
          <Button
            type="primary"
            onClick={() => {
              //   updateUserState(false, data.id);
              powerUpdateHandler(data.adminId, data.name, false, 'members');
            }}
            style={{ backgroundColor: '#f97316' }}
          >
            Disable
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              //   updateUserState(true, data.id);
              powerUpdateHandler(data.adminId, data.name, true, 'members');
            }}
            style={{ backgroundColor: 'green' }}
          >
            Enable
          </Button>
        );
      },
    },
    {
      title: 'Users',
      dataIndex: '',
      key: 'users',
      width: '15%',
      align: 'center',
      render: (data) => {
        return data.users == true ? (
          <Button
            type="primary"
            onClick={() => {
              //   updateUserState(false, data.id);
              powerUpdateHandler(data.adminId, data.name, false, 'users');
            }}
            danger
            style={{ backgroundColor: '#f97316' }}
          >
            Disable
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              //   updateUserState(true, data.id);
              powerUpdateHandler(data.adminId, data.name, true, 'users');
            }}
            style={{ backgroundColor: 'orange' }}
          >
            Enable
          </Button>
        );
      },
    },
    {
      title: 'Events',
      dataIndex: '',
      key: 'events',
      width: '15%',
      align: 'center',
      render: (data) => {
        return data.events == true ? (
          <Button
            type="primary"
            onClick={() => {
              //   updateUserState(false, data.id);
              powerUpdateHandler(data.adminId, data.name, false, 'events');
            }}
            danger
            style={{ backgroundColor: '#f97316' }}
          >
            Disable
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              //   updateUserState(true, data.id);
              powerUpdateHandler(data.adminId, data.name, true, 'events');
            }}
            style={{ backgroundColor: 'green' }}
          >
            Enable
          </Button>
        );
      },
    },
    {
      title: 'Contact',
      dataIndex: '',
      key: 'contact',
      width: '15%',
      align: 'center',
      render: (data) => {
        return data.contacts == true ? (
          <Button
            type="primary"
            onClick={() => {
              //   updateUserState(false, data.id);
              powerUpdateHandler(data.adminId, data.name, false, 'contacts');
            }}
            style={{ backgroundColor: '#f97316' }}
            danger
          >
            Disable
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              //   updateUserState(true, data.id);
              powerUpdateHandler(data.adminId, data.name, true, 'contacts');
            }}
            style={{ backgroundColor: 'green' }}
          >
            Enable
          </Button>
        );
      },
    },
    {
      title: 'Form',
      dataIndex: '',
      key: 'form',
      width: '15%',
      align: 'center',
      render: (data) => {
        return data.forms == true ? (
          <Button
            type="primary"
            onClick={() => {
              //   updateUserState(false, data.id);
              powerUpdateHandler(data.adminId, data.name, false, 'forms');
            }}
            style={{ backgroundColor: '#f97316' }}
            danger
          >
            Disable
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              powerUpdateHandler(data.adminId, data.name, true, 'forms');
            }}
            style={{ backgroundColor: 'green' }}
          >
            Enable
          </Button>
        );
      },
    },
    {
      title: 'Bouncer',
      dataIndex: '',
      key: 'form',
      width: '15%',
      align: 'center',
      render: (data) => {
        return data.bouncer == true ? (
          <Button
            type="primary"
            onClick={() => {
              //   updateUserState(false, data.id);
              powerUpdateHandler(data.adminId, data.name, false, 'bouncer');
            }}
            style={{ backgroundColor: '#f97316' }}
            danger
          >
            Disable
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              powerUpdateHandler(data.adminId, data.name, true, 'bouncer');
            }}
            style={{ backgroundColor: 'green' }}
          >
            Enable
          </Button>
        );
      },
    },
  ];

  return <Table loading={loading} columns={columns} dataSource={data} />;
};

export default PowersTable;
