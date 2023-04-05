import React from 'react';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EditOutlined,
  FileImageOutlined,
  GoogleOutlined,
  LockOutlined,
  TeamOutlined,
  UnlockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Dropdown, MenuProps, Tag, Tooltip } from 'antd';
import moment from 'moment';

const { Meta } = Card;

type props = {
  title: string;
  description: string;
  date: string;
  capacity: number;
  eventType: string;
  time: string;
  id: number;
  open: boolean;
  poster: string;
};

const EventCard = ({
  title,
  description,
  date,
  capacity,
  time,
  eventType,
  open,
}: props) => {
  let actionsArray = [];
  let userItems: MenuProps['items'] = [
    {
      key: '1',
      label: <button>Registered Users</button>,
      onClick: () => {},
    },
  ];

  //ongoing event
  if (moment(date).diff(moment().toDate(), 'days') == 0) {
    userItems.push({
      key: '2',
      label: <button>Visited Users</button>,
      onClick: () => {},
    });
    actionsArray.push(
      <Tooltip title="View Poster">
        <FileImageOutlined
          onClick={() => {
            // setImageOpened(true);
          }}
        />
      </Tooltip>
    );
    actionsArray.push(
      <Tooltip title="Edit">
        <EditOutlined />
      </Tooltip>
    );

    if (open == true) {
      actionsArray.push(
        <Tooltip title="Close Registerations">
          <LockOutlined style={{ color: 'red' }} />
        </Tooltip>
      );
    } else {
      actionsArray.push(
        <Tooltip title="Open Registerations">
          <UnlockOutlined style={{ color: 'green' }} />
        </Tooltip>
      );
    }

    actionsArray.push(
      <Dropdown
        menu={{ items: userItems }}
        trigger={['click', 'hover']}
        placement="bottom"
        arrow
      >
        <TeamOutlined />
      </Dropdown>
    );
  }

  if (moment(date).diff(moment().toDate(), 'days') > 0) {
    userItems.push({
      key: '2',
      label: <button>Visited Users</button>,
      onClick: () => {},
    });
    actionsArray.push(
      <FileImageOutlined
        onClick={() => {
          // setImageOpened(true);
        }}
      />
    );
    actionsArray.push(<EditOutlined />);

    if (open == true) {
      actionsArray.push(<LockOutlined style={{ color: 'red' }} />);
    } else {
      actionsArray.push(<UnlockOutlined style={{ color: 'green' }} />);
    }

    actionsArray.push(
      <Dropdown
        menu={{ items: userItems }}
        trigger={['click']}
        placement="bottom"
        arrow
      >
        <TeamOutlined />
      </Dropdown>
    );
  }

  return (
    <Card
      style={{
        width: 300,
        minHeight: '16rem',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      }}
      actions={actionsArray}
    >
      <Meta title={title} description={description} />

      <div className="tags mt-4 grid grid-cols-2 gap-2">
        <Tag
          icon={<UserOutlined style={{ verticalAlign: 'middle' }} />}
          color={'cyan'}
        >
          {capacity}
        </Tag>

        <Tag
          icon={<CalendarOutlined style={{ verticalAlign: 'middle' }} />}
          color={'green'}
        >
          {date}
        </Tag>

        <Tag
          icon={<ClockCircleOutlined style={{ verticalAlign: 'middle' }} />}
          color={'green'}
        >
          {time}
        </Tag>

        {eventType == 'offline' ? (
          <Tag
            icon={<TeamOutlined style={{ verticalAlign: 'middle' }} />}
            color={'green'}
          >
            offline
          </Tag>
        ) : (
          <Tag
            icon={<GoogleOutlined style={{ verticalAlign: 'middle' }} />}
            color={'green'}
          >
            online
          </Tag>
        )}
      </div>
    </Card>
  );
};

export default EventCard;
