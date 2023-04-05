import AdminDataHandler from '@/utils/data-handlers/admin.handler';
import {
  createToast,
  updateErrorToast,
  updateSuccessToast,
} from '@/utils/notification';
import { Skeleton } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddEventCard from './add-event-card';
import AddEventModal from './add-event-modal';
import EventCard from './event-card';

function EventsMain() {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventCreated, setEventCreated] = useState(0);
  const [eventsData, setEventsData] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsFetch, setEventsFetch] = useState(0);

  const handleOk = async () => {
    return;
  };
  const handleCancel = async () => {
    setModalOpen(false);
    return;
  };

  const onFinish = async (values: any) => {
    let eventToast = createToast('Creating New Event!!');
    let response = await axios.post('/api/admin/event/create-event', values);
    if (response.data.status == true) {
      updateSuccessToast(eventToast, 'Created New Event');
      setEventCreated(eventCreated + 1);
      setModalOpen(false);
      setEventsFetch(eventsFetch + 1);
    } else {
      updateErrorToast(eventToast, response.data.error);
    }
    return;
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const onFinsihFailed = () => {};

  const eventsDataFetcher = async () => {
    setEventsLoading(true);
    let response = await axios.get('/api/admin/event/get-events');
    let data = AdminDataHandler.eventsDataHandler(await response.data.data);
    setEventsData(data);
    setEventsLoading(false);
    return;
  };

  useEffect(() => {
    eventsDataFetcher();
  }, [eventsFetch]);

  return (
    <div className="">
      <div className="greenbanner bg-green-200 h-44"></div>
      <div className="wrapper -my-24 flex flex-col space-y-2">
        <div className="text-white px-5 text-2xl font-semibold">
          Recent Events
        </div>

        <AddEventModal
          onFinish={onFinish}
          onFinishFailed={onFinsihFailed}
          handleCancel={handleCancel}
          handleOk={handleOk}
          isModalOpen={modalOpen}
          created={eventCreated}
        />

        <div className="events pb-5 place-items-center grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5">
          <AddEventCard openModal={openModal} />
          <Skeleton
            style={{
              backgroundColor: 'white',
              minHeight: '16rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              verticalAlign: 'middle',
              borderRadius: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '0.8rem',
              paddingRight: '0.8rem',
            }}
            paragraph={{ rows: 5 }}
            active
            loading={eventsLoading}
          />
          <Skeleton
            style={{
              backgroundColor: 'white',
              minHeight: '16rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              verticalAlign: 'middle',
              borderRadius: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '0.8rem',
              paddingRight: '0.8rem',
            }}
            paragraph={{ rows: 5 }}
            active
            loading={eventsLoading}
          />

          <Skeleton
            style={{
              backgroundColor: 'white',
              minHeight: '16rem',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              verticalAlign: 'middle',
              borderRadius: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '0.8rem',
              paddingRight: '0.8rem',
            }}
            paragraph={{ rows: 5 }}
            active
            loading={eventsLoading}
          />

          {eventsLoading == false &&
            eventsData.map((event: any) => {
              return (
                <EventCard
                  eventType={event.eventType}
                  capacity={event.capacity}
                  date={event.date}
                  description={event.description}
                  id={event.id}
                  key={event.id}
                  time={event.time}
                  title={event.title}
                  open={event.lock}
                  poster={event.poster}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default EventsMain;
