import React from 'react';

function AddEventCard({ openModal }: { openModal: Function }) {
  return (
    <div
      onClick={() => {
        openModal();
      }}
      className="icon text-blue-500 bg-white hover:cursor-pointer hover:bg-gray-50 shadow-md w-full h-64 rounded-md flex flex-row justify-center items-center"
    >
      <div className="plusIcon flex flex-col justify-center items-center space-y-4">
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="text font-semibold text-xl">New Event</div>
      </div>
    </div>
  );
}

export default AddEventCard;
