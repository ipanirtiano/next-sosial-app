/* eslint-disable @next/next/no-img-element */
import React from "react";
import moment from "moment";

const CommenList = ({ item }: { item: any }) => {
  return (
    <div className="w-full flex gap-3 mt-2 pt-2 items-start">
      <div className="w-10 mt-1">
        <img
          src={item?.User.profile_pic}
          alt=""
          className="rounded-full w-8 h-8 object-cover bg-gray-200"
        />
      </div>
      <div className="w-full">
        <div className="flex items-center gap-3 justify-between">
          <p className="text-sm font-semibold">{item?.User.full_name}</p>
          <p className="text-xs text-gray-500 mb-1">
            {moment(item?.createdAt).fromNow()}
          </p>
        </div>
        <p className="text-sm w-full pr-[50px]">{item?.des_comment}</p>
      </div>
    </div>
  );
};

export default CommenList;
