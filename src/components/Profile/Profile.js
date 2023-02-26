import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  },[navigate]);

  return (
    <div className=" max-w-[1800px] px-[5%] pb-6 ">
      <div className=" mx-auto  ">
        <div className="flex flex-row items-end justify-between pb-10">
          <p className="  text-2xl font-bold  text-left  tracking-tight text-gray-900  mb-0 mt-10  capitalize">
            {props.username} Profile
          </p>
        </div>

        <div
          onClick={props.handleLogOut}
          className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start mb-8"
        >
          <div className="rounded-md shadow w-full sm:w-[250px]">
            <button
              noValidate
              type="submit"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 md:py-4 md:text-lg md:px-10 cursor-pointer"
            >
              <p className="leading-relaxed text-sm">Log Out</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
