import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import DisplayPersonal from "./displayItems/DisplayPersonal";
import DisplaySocial from "./displayItems/DisplaySocial";
import DisplayWorkInfo from "./displayItems/DisplayWorkInfo";
import { PhoneIcon, MailIcon, ChatAltIcon } from "@heroicons/react/solid";
import QRmodal from "./QRmodal";

const axios = require("axios");
export default function DisplayCard() {
  const [data, setData] = useState(null);
  const [qrToggle, setQrToggle] = useState(false);
  //component did mount call only once []
  useEffect(() => {
    axios
      .get(`http://localhost:3000/vCards/mycard/Anna/625d09b3d36a00d058c9aecc`)
      .then((response) => {
        const data = response.data;
        setData(data);
      });
  }, []);
  function getCard() {
    console.log("here");
    axios
      .get(`http://localhost:3000/vCards/Anna/625d09b3d36a00d058c9aecc`)
      .then(function (response) {
        console.log(response);
        download(`${response.data[1]}.VCF`, response.data[0]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  function download(filename, text) {
    console.log("here");
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/vcard;charset=utf-8," + encodeURIComponent(text)
    );
    console.log(element);
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function shareCard() {
    setQrToggle(!qrToggle);
    console.log("here");
  }

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
      qrCode,
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
      formatUSNumber(workPhone),
      workEmail,
      workUrl,
    ];
    const socialData = [
      ["Facebook", facebook],
      ["Twitter", twitter],
      ["LinkedIn", linkedIn],
    ];
    return (
      <div className="grid grid-cols-4 gap-x-4 place-content-center justify-items-center bg-gray-500 ">
        <div className=" w-full col-span-5 h-60  relative">
          <img
            className="object-cover overflow-hiddenr w-full col-span-5 h-64 object-center"
            src={data.logo.url}
            alt="logo"
          />
          <div className=" rounded-full overflow-hidden justify-self-center absolute bottom-[-88px] left-2/4 translate-x-negative-half z-20 ">
            <img
              src={data.photo.url}
              alt="profile"
              className="h-36 w-36 lg:h-50 lg:w-50 object-cover border-solid  rounded-full border-gray-50  border-8 relative "
            />
          </div>
        </div>
        <div className="col-span-5 pt-104 bg-white w-full rounded-t-3xl z-10">
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
              <button
                onClick={getCard}
                className="text-small text-white font-medium pt-4 pb-4 mb-4 w-full bg-gray-500 rounded-2xl hover:bg-opacity-70 "
              >
                {"Add To Contacts".toUpperCase()}
              </button>
              <button
                onClick={shareCard}
                className="text-small text-white font-medium pt-4 pb-4 mb-8 w-full bg-gray-500 rounded-2xl  hover:bg-opacity-70 "
              >
                {"Share Card".toUpperCase()}
              </button>
              <QRmodal
                qrToggle={qrToggle}
                qrCode={qrCode}
                shareCard={shareCard}
              />
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
