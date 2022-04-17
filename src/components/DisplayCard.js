import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import DisplayPersonal from "./displayItems/DisplayPersonal";
import DisplaySocial from "./displayItems/DisplaySocial";
import DisplayWorkInfo from "./displayItems/DisplayWorkInfo";
import { PhoneIcon, MailIcon, ChatAltIcon } from "@heroicons/react/solid";

const axios = require("axios");
export default function DisplayCard() {
  const [data, setData] = useState(null);
  //component did mount call only once []
  useEffect(() => {
    axios
      .get(
        `https://britekard.herokuapp.com/vCards/mycard/Anna/62590197d2fd0cc5f3da0121`
      )
      .then((response) => {
        const data = response.data;
        setData(data);
      });
  }, []);

  function formatUSNumber(entry) {
    const match = entry
      .replace(/\D+/g, "")
      .replace(/^1/, "")
      .match(/([^\d]*\d[^\d]*){1,10}$/)[0];
    const part1 = match.length > 2 ? `(${match.substring(0, 3)})` : match;
    const part2 = match.length > 3 ? ` ${match.substring(3, 6)}` : "";
    const part3 = match.length > 6 ? `-${match.substring(6, 10)}` : "";
    return `${part1}${part2}${part3}`;
  }

  if (data) {
    const {
      cellPhone,
      email,
      lastName,
      firstName,
      homeAddress: { street: houseStreet },
      homeAddress: { city: houseCity },
      homeAddress: { stateProvince: houseState },
      homeAddress: { postalCode: housezip },
      workAddress: { street: workStreet },
      workAddress: { city: workCity },
      workAddress: { stateProvince: workState },
      workAddress: { postalCode: workzip },
      workUrl,
      workEmail,
      workPhone,
      organization,
      socialUrls: { facebook },
      socialUrls: { twitter },
      socialUrls: { linkedIn },
      url,
    } = data;
    const myName = `${firstName} ${lastName}`;

    const personalInfo = [myName, formatUSNumber(cellPhone), email, url];
    const personalTags = [
      "Name",
      "Phone Number",
      "Email",
      "Personal Website",
      "Home Address",
    ];
    const workAddressData = [
      organization,
      workUrl,
      workEmail,
      formatUSNumber(workPhone),
    ];
    const socialData = [
      ["Facebook", facebook],
      ["Twitter", twitter],
      ["LinkedIn", linkedIn],
    ];
    return (
      <div className="grid grid-cols-4 gap-x-4 place-content-center justify-items-center bg-gray-500 ">
        <div className=" w-full col-span-5 h-60  relative">
          <div className="h-44 lg:h-52 w-44  lg:w-52 border-white rounded-full overflow-hidden border-12 justify-self-center absolute bottom-[-88px] left-2/4 translate-x-negative-half">
            <img
              src={data.photo.url}
              alt="profile"
              className="h-36 w-36 lg:h-48 lg:w-48 object-cover border-solid scale-150 rounded-full relative"
            />
          </div>
        </div>
        <div className="col-span-5 pt-104 bg-white w-full rounded-t-3xl ">
          <div>
            <p className="text-2xl font-medium text-gray-700 tracking-wide text-center">
              {data.firstName} {data.lastName}
            </p>
            <p className="text-lg text-gray-600 font-light text-center">
              {data.title} @ {data.organization}
            </p>
          </div>
          <div className="flex gap-4 pt-4 justify-center">
            <div className="h-12 w-12 rounded-full border-gray-500 border-2 bg-white  flex justify-center items-center hover:bg-gray-500">
              <PhoneIcon className="fill-gray-500  h-7 w-7 hover:fill-white" />
            </div>
            <div className="h-12 w-12 rounded-full border-gray-500 border-2 bg-white flex justify-center items-center hover:bg-gray-500">
              <ChatAltIcon className="fill-gray-500    h-7 w-7 hover:fill-white" />
            </div>
            <div className="h-12 w-12 rounded-full border-gray-500 border-2 bg-white flex justify-center items-center hover:bg-gray-500">
              <MailIcon className="fill-gray-500   h-7 w-7 hover:fill-white" />
            </div>
          </div>
          <div>
            <p className="text-base text-gray-600 pt-9 pb-8 text-center">
              {data.note}
            </p>
            <div className="flex px-4 flex-col">
              <button className="text-small text-white font-medium pt-4 pb-4 mb-4 w-full bg-gray-500 rounded-2xl hover:bg-opacity-70 ">
                {"Add To Contacts".toUpperCase()}
              </button>
              <button className="text-small text-white font-medium pt-4 pb-4 mb-8 w-full bg-gray-500 rounded-2xl  hover:bg-opacity-70 ">
                {"Get QR Code".toUpperCase()}
              </button>
            </div>
          </div>
          <DisplayPersonal
            personalInfo={personalInfo}
            personalTags={personalTags}
            houseCity={houseCity}
            houseState={houseState}
            houseStreet={houseStreet}
            housezip={housezip}
          />

          <DisplayWorkInfo
            workCity={workCity}
            workState={workState}
            workStreet={workStreet}
            workzip={workzip}
            workAddressData={workAddressData}
          />
          <DisplaySocial socialData={socialData} />
        </div>
      </div>
    );
  } else {
    return (
      <div className=" h-screen w-screen bg-white flex justify-center items-center">
        <RotatingLines
          color="gray"
          height={200}
          width={200}
          ariaLabel="three-circles-rotating"
          className="flex"
        />
      </div>
    );
  }
}
