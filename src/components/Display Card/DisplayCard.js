import React, { useState, useEffect } from "react";
import DisplayPersonal from "./Display Sections/DisplayPersonal";
import DisplaySocial from "./Display Sections/DisplaySocial";
import DisplayWorkInfo from "./Display Sections/DisplayWorkInfo";
import { PhoneIcon, MailIcon, ChatAltIcon } from "@heroicons/react/solid";
import { useParams } from "react-router-dom";
import QRmodal from "./Display Sections/Display Functions/QRmodal";
import LoadingScreen from "../LoadingScreen";

const axios = require("axios");

export default function DisplayCard() {
  let { username, id } = useParams();
  const [data, setData] = useState(null);
  const [qrToggle, setQrToggle] = useState(false);
  const backend =
    process.env.REACT_APP_ENV === "staging"
      ? "http://localhost:49152"
      : "https://britekard.herokuapp.com";

  useEffect(() => {
    axios.get(`${backend}/vCards/mycard/${username}/${id}`).then((response) => {
      const data = response.data[0];
      setData(data);
    });
  }, [backend, id, username]);

  function getCard() {
    axios
      .get(`${backend}/vCards/${username}/${id}`)
      .then(function (response) {
        download(`${username}.VCF`, response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/vcard;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  function shareCard() {
    setQrToggle(!qrToggle);
  }

  if (data) {
    let {
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
      socialUrls: { github },
      socialUrls: { youtube },
      socialUrls: { snapchat },
      socialUrls: { tumblr },
      socialUrls: { tiktok },
      socialUrls: { meetup },
      socialUrls: { twitch },
      socialUrls: { instagram },
      url,
    } = data;
    const myName = `${firstName} ${lastName}`;
    let workAddressData = [organization, workPhone, workEmail, workUrl];

    const personalInfo = [myName, cellPhone, email, url];
    const personalTags = [
      "Name",
      "Phone Number",
      "Email",
      "Personal Website",
      "Home Address",
    ];

    const socialData = [
      ["Github", github],
      ["Youtube", youtube],
      ["Snapchat", snapchat],
      ["Tumblr", tumblr],
      ["TikTok", tiktok],
      ["Meetup", meetup],
      ["Twitch", twitch],
      ["Instagram", instagram],
      ["Facebook", facebook],
      ["Twitter", twitter],
      ["LinkedIn", linkedIn],
    ];

    return (
      <div className=" w-full h-full sm:py-16">
        <div className="grid grid-cols-4 gap-x-4 place-content-center justify-items-center bg-gray-500  sm:bg-white max-w-screen-sm mx-auto sm:pb-12 sm:px-9 sm:rounded-3xl">
          <div className=" w-full col-span-5 h-60  sm:h-64 relative sm:pt-12 sm:pb-104">
            {data.logo && (
              <img
                className="object-cover overflow-hiddenr w-full h-64 object-center sm:rounded-3xl"
                src={data.logo}
                alt="logo"
              />
            )}
            {!data.photo && (
              <div className="object-cover overflow-hiddenr w-full h-64 object-center sm:rounded-3xl bg-gray-500"></div>
            )}

            {data.photo && (
              <div className=" rounded-full overflow-hidden justify-self-center absolute bottom-[-88px] sm:bottom-[-124px] left-2/4 translate-x-negative-half z-20">
                <img
                  src={data.photo}
                  alt="profile"
                  className="h-36 w-36 sm:h-40 sm:w-40 object-cover border-solid  rounded-full border-gray-50  border-8 relative "
                />
              </div>
            )}
            {!data.photo && (
              <div className=" rounded-full overflow-hidden justify-self-center absolute bottom-[-88px] sm:bottom-[-124px] left-2/4 translate-x-negative-half z-20">
                <div
                  alt="profile"
                  className="h-36 w-36 sm:h-40 sm:w-40  border-solid  bg-gray-200 rounded-full border-gray-50  border-8 relative flex justify-center items-center   "
                >
                  <p className="text-3xl sm:text-4xl uppercase font-bold antialiased text-gray-500">
                    {data.firstName[0]} {data.lastName[0]}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="col-span-5 pt-104  sm:pt-0 sm:mt-[146px] bg-white w-full rounded-t-3xl z-10">
            <div>
              <p className="text-2xl font-medium text-gray-700 tracking-wide text-center capitalize ">
                {data.firstName} {data.lastName}
              </p>
              {data.title && (
                <p className="text-lg text-gray-600 font-light text-center capitalize ">
                  {data.title} @ {data.organization}
                </p>
              )}
            </div>
            <div className="flex gap-4 pt-4 justify-center pb-9 ">
              {cellPhone && (
                <>
                  <div className="h-12 w-12 rounded-full border-gray-500 border-2 bg-white  flex justify-center items-center hover:bg-gray-500">
                    <a href={`tel:+1${cellPhone}`}>
                      <PhoneIcon className="fill-gray-500  h-7 w-7 hover:fill-white" />
                    </a>
                  </div>
                  <div className="h-12 w-12 rounded-full border-gray-500 border-2 bg-white flex justify-center items-center hover:bg-gray-500">
                    <a href={`sms:+1${cellPhone}`}>
                      <ChatAltIcon className="fill-gray-500    h-7 w-7 hover:fill-white" />
                    </a>
                  </div>
                </>
              )}
              {email && (
                <div className="h-12 w-12 rounded-full border-gray-500 border-2 bg-white flex justify-center items-center hover:bg-gray-500">
                  <a href={`mailto:${email}`}>
                    <MailIcon className="fill-gray-500   h-7 w-7 hover:fill-white" />
                  </a>
                </div>
              )}
            </div>
            <div>
              {data.note && (
                <p className="text-base text-gray-600 pb-8 text-center">
                  {data.note}
                </p>
              )}
              <div className="flex px-4 flex-col">
                <button
                  onClick={getCard}
                  className={`text-small text-white font-medium pt-4 pb-4 mb-4 w-full rounded-2xl hover:bg-opacity-70 bg-${data.colorScheme}`}
                >
                  {"Add To Contacts".toUpperCase()}
                </button>
                <button
                  onClick={shareCard}
                  className={`text-small text-white font-medium pt-4 pb-4 mb-8 w-full rounded-2xl  hover:bg-opacity-70 bg-${data.colorScheme}`}
                >
                  {"Share Card".toUpperCase()}
                </button>
                <QRmodal
                  qrToggle={qrToggle}
                  qrCode={data.qrCode}
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
      </div>
    );
  } else {
    return <LoadingScreen />;
  }
}
