import PersonalInfo from "./Form Sections/PersonalInfo";
import SocialLinks from "./Form Sections/SocialLikns";
import HomeAddress from "./Form Sections/HomeAddress";
// import Chips from "./Form Sections/Chips";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WorkInfo from "./Form Sections/WorkInfo";
import CoverPhoto from "./Form Sections/CoverPhoto";
import LoadingScreen from "../LoadingScreen";

const axios = require("axios");
export default function UpdateForm() {
  const navigate = useNavigate();
  const { username, id } = useParams();

  const [options, setOptions] = useState([
    { name: "Home Address", toggle: true },
    { name: "Work Info", toggle: true },
    { name: "Social Links", toggle: true },
    { name: "Cover Photo", toggle: true },
  ]);

  const [userInputs, setUserInputs] = useState(null);
  const [submittedUpdate, setSubmittedUpdate] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/vCards/mycard/update/${username}/${id}`
      )
      .then((response) => {
        setUserInputs(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id, username]);
  function handleSubmit(event) {
    event.preventDefault();
    let body = userInputs;
    sendData(body);
  }
  function sendData(body) {
    setSubmittedUpdate(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/vCards/mycard/update/${username}/${id}`,
        body
      )
      .then((response) => {
        navigate(-1);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function cancelUpdate() {
    navigate(-1);
  }

  function formatUSNumber(entry) {
    if (entry.length < 1) {
      return entry;
    }
    const match = entry.replace(/\D+/g, "").match(/([^\d]*\d[^\d]*){1,10}$/)[0];
    const part1 = match.length > 2 ? `${match.substring(0, 3)}` : match;
    const part2 = match.length > 3 ? `-${match.substring(3, 6)}` : "";
    const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : "";
    return `${part1}${part2}${part3}`;
  }
  function handleImageChange(base64, type) {
    const userObj = { ...userInputs };
    if (type === "profile") {
      const prevImage = userObj.photo;
      userObj.previousPhoto = prevImage;
      userObj.photo = base64;
    } else {
      const prevImage = userObj.logo;
      userObj.previousLogo = prevImage;
      userObj.logo = base64;
    }

    setUserInputs(userObj);
  }

  const handleChange = (event) => {
    const userObj = { ...userInputs };
    let value = event.target.value;
    let objKey = event.target.getAttribute("id");
    if (
      (objKey === "cellPhone" && objKey.length > 0) ||
      (objKey === "workPhone" && objKey.length > 0) ||
      (objKey === "workFax" && objKey.length > 0)
    ) {
      value = formatUSNumber(value);
    }

    objKey = objKey.split(".");
    if (objKey.length === 1) {
      userObj[objKey[0]] = value;
    } else {
      userObj[objKey[0]][objKey[1]] = value;
    }
    setUserInputs(userObj);
  };
  // function toggle(e) {
  //   let newOptions = [...options];
  //   newOptions[e].toggle = !newOptions[e].toggle;
  //   setOptions(newOptions);
  // }

  if (submittedUpdate || !userInputs) {
    return <LoadingScreen />;
  } else if (userInputs) {
    return (
      <div className=" max-w-[1800px] px-[5%] m-auto ">
        <div className=" mx-auto  ">
          <div className="flex flex-row items-end justify-between pb-10">
            <p className=" text-2xl font-bold  text-left  tracking-tight text-gray-900  mb-0 mt-10 ">
              Update Card
            </p>
          </div>
          {/* <div className="flex flex-row flex-nowrap overflow-scroll scrollbar-hide my-8 pl-4 sm:pl-0 container mx-auto gap-2">
            <Chips options={options} toggle={toggle} />
          </div> */}
        </div>
        <div className=" mx-auto ">
          <form onSubmit={handleSubmit}>
            <PersonalInfo
              handleImageChange={handleImageChange}
              userInputs={userInputs}
              handleChange={handleChange}
            />
            {options.map((el, idx) => {
              if (el.toggle && el.name === "Home Address") {
                return (
                  <HomeAddress
                    key={idx}
                    handleChange={handleChange}
                    userInputs={userInputs}
                  />
                );
              }
              if (el.toggle && el.name === "Social Links") {
                return (
                  <SocialLinks
                    key={idx}
                    handleChange={handleChange}
                    userInputs={userInputs}
                  />
                );
              }
              if (el.toggle && el.name === "Work Info") {
                return (
                  <WorkInfo
                    key={idx}
                    handleChange={handleChange}
                    userInputs={userInputs}
                  />
                );
              }
              if (el.toggle && el.name === "Cover Photo") {
                return (
                  <CoverPhoto
                    key={idx}
                    handleImageChange={handleImageChange}
                    logo={userInputs.logo}
                  />
                );
              } else {
                return null;
              }
            })}
            <div className='flex flex-col lg:flex-row gap-4 align-center my-10 '>
              <div className=" sm:flex justify-center  sm:justify-start">
                <div className="rounded-md shadow w-full lg:w-[300px]">
                  <button
                    type="submit"
                    className="w-full  flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 md:py-4 md:text-lg md:px-10 cursor-pointer"
                  >
                    <p className="leading-relaxed text-sm"> Update Card</p>
                  </button>
                </div>
              </div>
              <div className=" sm:flex justify-center  sm:justify-start">
                <div className="rounded-md shadow w-full lg:w-[300px]">
                  <button
                    onClick={cancelUpdate}
                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-900 text-base font-medium rounded-md text-gray-900 bg-gray-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10 cursor-pointer"
                  >
                    <p className="leading-relaxed text-sm"> Cancel</p>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
