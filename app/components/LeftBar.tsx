import { user } from "@prisma/client";
import SideMenu from "./SideMenu";

const LeftBar = ({ user }: { user: user }) => {
  return (
    <div className="h-screen overflow-auto hidden md:block bg-white pt-[80px] px-6 text-gray-800">
      <SideMenu user={user} />
    </div>
  );
};

export default LeftBar;
