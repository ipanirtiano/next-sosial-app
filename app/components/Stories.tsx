import Image from "next/image";

const Stories = () => {
  return (
    <>
      <div className="w-full h-[200px] space-x-3 overflow-x-scroll scrollbar-hide whitespace-nowrap">
        <div className="inline-block w-[140px] h-full relative">
          <Image
            className="w-full h-full object-cover rounded-xl"
            src="/assets/stories1.jpg"
            width={140}
            height={180}
            alt=""
          ></Image>
          <div className="absolute bg-gradient-to-t from-black opacity-80 inset-0 cursor-pointer rounded-xl"></div>

          <div className="absolute bottom-4 left-2 cursor-pointer">
            <p className="text-white text-sm">Ipan Irtiano</p>
            <p className="text-gray-200 text-[10px]">2 Hours ago</p>
          </div>
        </div>

        <div className="inline-block w-[140px] h-full relative">
          <Image
            className="w-full h-full object-cover rounded-xl"
            src="/assets/stories2.jpg"
            width={140}
            height={180}
            alt=""
          ></Image>
          <div className="absolute bg-gradient-to-t from-black opacity-80 inset-0 cursor-pointer rounded-xl"></div>

          <div className="absolute bottom-4 left-2 cursor-pointer">
            <p className="text-white text-sm">Jhon Doe</p>
            <p className="text-gray-200 text-[10px]">2 Hours ago</p>
          </div>
        </div>

        <div className="inline-block w-[140px] h-full relative">
          <Image
            className="w-full h-full object-cover rounded-xl"
            src="/assets/stories3.jpg"
            width={140}
            height={180}
            alt=""
          ></Image>
          <div className="absolute bg-gradient-to-t from-black opacity-80 inset-0 cursor-pointer rounded-xl"></div>

          <div className="absolute bottom-4 left-2 cursor-pointer">
            <p className="text-white text-sm">Mark</p>
            <p className="text-gray-200 text-[10px]">2 Hours ago</p>
          </div>
        </div>

        <div className="inline-block w-[140px] h-full relative">
          <Image
            className="w-full h-full object-cover rounded-xl"
            src="/assets/stories4.jpg"
            width={140}
            height={180}
            alt=""
          ></Image>
          <div className="absolute bg-gradient-to-t from-black opacity-80 inset-0 cursor-pointer rounded-xl"></div>

          <div className="absolute bottom-4 left-2 cursor-pointer">
            <p className="text-white text-sm">Ellon Musk</p>
            <p className="text-gray-200 text-[10px]">2 Hours ago</p>
          </div>
        </div>

        <div className="inline-block w-[140px] h-full relative">
          <Image
            className="w-full h-full object-cover rounded-xl"
            src="/assets/stories5.jpg"
            width={140}
            height={180}
            alt=""
          ></Image>
          <div className="absolute bg-gradient-to-t from-black opacity-80 inset-0 cursor-pointer rounded-xl"></div>

          <div className="absolute bottom-4 left-2 cursor-pointer">
            <p className="text-white text-sm">Benjamin</p>
            <p className="text-gray-200 text-[10px]">2 Hours ago</p>
          </div>
        </div>

        <div className="inline-block w-[140px] h-full relative">
          <Image
            className="w-full h-full object-cover rounded-xl"
            src="/assets/stories2.jpg"
            width={140}
            height={180}
            alt=""
          ></Image>
          <div className="absolute bg-gradient-to-t from-black opacity-80 inset-0 cursor-pointer rounded-xl"></div>

          <div className="absolute bottom-4 left-2 cursor-pointer">
            <p className="text-white text-sm">Jhon Doe</p>
            <p className="text-gray-200 text-[10px]">2 Hours ago</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stories;
