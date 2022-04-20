import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import DisplayPersonal from "./displayItems/DisplayPersonal";
import DisplaySocial from "./displayItems/DisplaySocial";
import DisplayWorkInfo from "./displayItems/DisplayWorkInfo";
import { PhoneIcon, MailIcon, ChatAltIcon } from "@heroicons/react/solid";
import { useParams } from "react-router-dom";
import QRmodal from "./QRmodal";

const axios = require("axios");
export default function DisplayCard(props) {
  let { username, id } = useParams();
  console.log("Im in display cards", { username }, { id });
  const [data, setData] = useState(null);
  const [qrToggle, setQrToggle] = useState(false);
  //component did mount call only once []
  useEffect(() => {
    axios
      .get(`https://britekard.herokuapp.com/vCards/mycard/${username}/${id}`)
      .then((response) => {
        console.log(response);
        const data = response.data;
        setData(data);
      });
  }, []);
  function getCard() {
    console.log("here");
    axios
      .get(`https://britekard.herokuapp.com/vCards/${username}/${id}`)
      .then(function (response) {
        console.log(response);
        download(`${username}.VCF`, response.data[0]);
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
      qrCode,
    } = data;
    const myName = `${firstName} ${lastName}`;
    let workAddressData = [organization, workPhone, workEmail, workUrl];
    if (cellPhone) {
      cellPhone = formatUSNumber(cellPhone);
    }
    if (workPhone) {
      workPhone = formatUSNumber(workPhone);
    }

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
      <div className="bg-gray-200 w-full h-full sm:py-16">
        <div className="grid grid-cols-4 gap-x-4 place-content-center justify-items-center bg-gray-500  sm:bg-white max-w-screen-sm mx-auto sm:pb-12 sm:px-9 sm:rounded-3xl">
          <div className=" w-full col-span-5 h-60  sm:h-64 relative sm:pt-12 sm:pb-104">
            <img
              className="object-cover overflow-hiddenr w-full h-64 object-center sm:rounded-3xl"
              src={data.logo.url}
              alt="logo"
            />
            <div className=" rounded-full overflow-hidden justify-self-center absolute bottom-[-88px] sm:bottom-[-124px] left-2/4 translate-x-negative-half z-20">
              <img
                src={data.photo.url}
                alt="profile"
                className="h-36 w-36 sm:h-40 sm:w-40 object-cover border-solid  rounded-full border-gray-50  border-8 relative "
              />
            </div>
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
              {data.note && (
                <p className="text-base text-gray-600 pb-8 text-center">
                  {data.note}
                </p>
              )}
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
