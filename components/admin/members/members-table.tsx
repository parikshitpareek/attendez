import React, { useRef, useState } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { InputRef, Popconfirm } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import Highlighter from 'react-highlight-words';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  email: string;
  sno: number;
  rollNo: number;
  team: string;
  designation: string;
  year: string;
}

type DataIndex = keyof DataType;

const MembersTable = ({
  data,
  loading,
  deleteMembersHandler,
}: {
  data: any;
  loading: boolean;
  deleteMembersHandler: Function;
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
      width: '20%',
      ...getColumnSearchProps('email'),
      align: 'center',
    },
    {
      title: 'Roll No',
      dataIndex: 'rollNo',
      key: 'rollNo',
      width: '15%',
      ...getColumnSearchProps('rollNo'),
      align: 'center',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      width: '5%',
      ...getColumnSearchProps('year'),
      align: 'center',
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      width: '10%',
      ...getColumnSearchProps('team'),
      align: 'center',
    },
    {
      title: 'Desg',
      dataIndex: 'designation',
      key: 'designation',
      width: '10%',
      align: 'center',
      ...getColumnSearchProps('designation'),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Update',
      dataIndex: 'id',
      key: 'updatedAt',
      width: '10%',
      align: 'center',
      render: () => {
        return (
          <button>
            <EditOutlined
              color="#facc15"
              style={{ color: '#facc15', fontSize: '20px' }}
            />
          </button>
        );
      },
    },
    {
      title: 'Remove',
      dataIndex: 'id',
      key: 'remove',
      width: '10%',
      align: 'center',
      render: (id) => {
        return (
          <Popconfirm
            title="Delete Member"
            okButtonProps={{
              style: { color: 'white', backgroundColor: '#dc2626' },
            }}
            onConfirm={() => {
              deleteMembersHandler(id);
            }}
            description="Are you sure to remove this member?"
            icon={<QuestionCircleOutlined style={{ color: '#dc2626' }} />}
            placement="left"
          >
            <button>
              <DeleteOutlined
                color="#dc2626"
                style={{
                  color: '#dc2626',
                  fontSize: '20px',
                  verticalAlign: 'middle',
                }}
              />
            </button>
          </Popconfirm>
        );
      },
    },
  ];

  return <Table loading={loading} columns={columns} dataSource={data} />;
};

export default MembersTable;
