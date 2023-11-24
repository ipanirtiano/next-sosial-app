import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineLogout } from "react-icons/ai";
import axios from "axios";

const Logout = () => {
  // init router
  const router = useRouter();
  // state modal box
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // state loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // funtion handle logout
  const handleLogout = async () => {
    // set loading true
    setIsLoading(true);
    try {
      const response = await axios.delete("/api/auth/logout");
      setIsLoading(false);
      router.push("/");
      router.refresh();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="gap-3 flex items-center "
      >
        <AiOutlineLogout className="w-6 h-6 rounded-full" />
        <p className="font-semibold text-sm">Sign Out</p>
      </button>

      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-2xl mb-2">Logout ?</h3>

          <p>Are you sure to Logout ?</p>
          <div className="modal-action">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md text-sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              Close
            </button>

            <button
              onClick={handleLogout}
              type="button"
              className="px-4 py-2 bg-purple-700 text-gray-100 rounded-md"
            >
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="loading loading-spinner loading-sm"></span>
                    Loading...
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm">Logout</div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
