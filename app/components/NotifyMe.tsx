import { useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const NotifyMe = ({
  handleClick,
  isOpen,
  status,
  message,
}: {
  handleClick: React.ReactEventHandler;
  isOpen: boolean;
  status: boolean;
  message: string;
}) => {
  return (
    <div className={isOpen ? "modal modal-open" : "modal"}>
      <div className="modal-box relative">
        {status ? (
          <div className="flex flex-col items-center justify-center space-y-2">
            <FaRegCheckCircle className="text-[80px] text-green-500" />
            <p className="font-semibold">Success</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2">
            <IoIosCloseCircleOutline className="text-[80px] text-red-500" />
            <p className="font-semibold">Error!</p>
          </div>
        )}

        <p className="mt-2 text-center">{message}</p>
        <div className="modal-action">
          <div
            onClick={handleClick}
            className="absolute right-4 top-4 cursor-pointer hover:font-semibold"
          >
            <IoMdClose className="text-2xl text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifyMe;
