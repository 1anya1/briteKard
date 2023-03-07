import React, { useState, useEffect } from "react";
import DisplayPersonal from "./Display Sections/DisplayPersonal";
import DisplaySocial from "./Display Sections/DisplaySocial";
import DisplayWorkInfo from "./Display Sections/DisplayWorkInfo";
import { PhoneIcon, MailIcon, ChatAltIcon } from "@heroicons/react/solid";
import { useParams, useLocation } from "react-router-dom";
import QRmodal from "./Display Sections/Display Functions/QRmodal";
import LoadingScreen from "../LoadingScreen";
import { browserName } from "react-device-detect";
import EmptyBackground from "./Display Sections/EmptyBackground";
import { Link } from "react-router-dom";
import Header from "../Header/Header";


const Color = require("color");

const axios = require("axios");

export default function DisplayCard() {
  let { username, id } = useParams();
  const { pathname } = useLocation();
  const [error, setError] = useState(false);

  const [data, setData] = useState(null);
  const [qrToggle, setQrToggle] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/vCards/mycard/${username}/${id}`
      )
      .then((response) => {
        const data = response.data[0];
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        setError(true);
      });
  }, [id, username]);
  const handleAnalytics = (dataType) => {
    if (pathname.includes("share")) {
      const time = new Date().getTime();
      const body = { cardId: data._id, [dataType]: time };
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/engagement`, body)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  function getCard() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/vCards/${username}/${id}`)
      .then(function (response) {
        download({ username }, response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function download(filename, text) {
    if (browserName === "Firefox") {
      alert("in here");
      const dataUri = `data:text/vcard;charset=utf-8,${encodeURIComponent(
        text
      )}`;
      const win = window.open(dataUri, "_blank");
      win.focus();
    } else {
      const blob = new Blob([text], { type: "text/vcard" });
      if (window.navigator.msSaveOrOpenBlob) {
        // Use Microsoft-specific function to open file on iOS
        window.navigator.msSaveOrOpenBlob(blob, `${filename.username}.vcf`);
      } else {
        // Use standard method for other browsers
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${filename.username}.vcf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    }
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
      colorScheme,
      homeAddress: { street: houseStreet },
      homeAddress: { city: houseCity },
      homeAddress: { stateProvince: houseState },
      homeAddress: { postalCode: housezip },
      homeAddress: { countryRegion: houseCountry },
      workAddress: { street: workStreet },
      workAddress: { city: workCity },
      workAddress: { stateProvince: workState },
      workAddress: { postalCode: workzip },
      workAddress: { countryRegion: workCountry },
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
    const cardView = () => {
      return (
        <div
          className={`${
            pathname.includes("share") ? "sm:pb-12 sm:px-9" : "sm:pb-12 sm:px-9"
          } grid grid-cols-4 gap-x-4 place-content-center justify-items-center bg-white max-w-screen-sm mx-auto  sm:rounded-3xl`}
        >
          <div className=" w-full col-span-5 h-60  sm:h-64 relative sm:pt-12 sm:pb-104">
            {data.logo && (
              <img
                className="object-cover overflow-hidden w-full h-64 object-center sm:rounded-3xl"
                src={data.logo}
                alt="logo"
              />
            )}
            {!data.logo && (
              <div className=" w-full h-64 object-center sm:rounded-3xl overflow-hidden">
                <div className="h-[104%] w-[110%] left-[-2%] top-[-2%] relative">
                  <EmptyBackground color={colorScheme.brandColor} />
                </div>
              </div>
            )}

            {data.photo && (
              <div className=" rounded-full overflow-hidden justify-center flex absolute bottom-[-78px] sm:bottom-[-124px] w-full  z-20">
                <img
                  src={data.photo}
                  alt="profile"
                  className="h-36 w-36 sm:h-40 sm:w-40 object-cover border-solid  rounded-full relative  border-white border-8 "
                />
              </div>
            )}
            {!data.photo && (
              <div className=" rounded-full overflow-hidden justify-center flex absolute bottom-[-78px] sm:bottom-[-124px] w-full  z-20">
                <div
                  alt="profile"
                  className="h-36 w-36 sm:h-40 sm:w-40  border-solid  bg-gray-200 rounded-full border-white border-8 relative flex justify-center items-center   "
                >
                  <p className="text-3xl sm:text-4xl uppercase font-bold antialiased text-gray-500">
                    {data.firstName[0]} {data.lastName[0]}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="col-span-5 pt-104  sm:pt-0 sm:mt-[146px] bg-white w-full rounded-t-3xl z-10">
            <div className="px-4 md:px-0">
              <p className=" text-[28px] sm:text-[32px] leading-tight font-medium text-gray-700 tracking-wide text-center capitalize pb-2">
                {data.firstName} {data.lastName}
              </p>
              {data.title && (
                <p className="  text-[18px] sm:text-[20px] text-gray-600 font-light text-center capitalize ">
                  {data.title} @ {data.organization}
                </p>
              )}
            </div>
            <div className="flex space-x-4 pt-4 justify-center pb-9  flex-wrap">
              {cellPhone && (
                <>
                  <div
                    onClick={() => handleAnalytics("phone")}
                    className="h-12 w-12 rounded-full  flex justify-center items-center  hover:opacity-75"
                    style={{
                      backgroundColor: data.colorScheme.brandColor,
                    }}
                  >
                    <a href={`tel:+1${cellPhone}`}>
                      <PhoneIcon
                        className="  h-7 w-7"
                        style={{ fill: data.colorScheme.textColor }}
                      />
                    </a>
                  </div>
                  <div
                    className="h-12 w-12 rounded-full  flex justify-center items-center hover:opacity-75"
                    style={{ backgroundColor: data.colorScheme.brandColor }}
                  >
                    <a href={`sms:+1${cellPhone}`}>
                      <ChatAltIcon
                        className="h-7 w-7"
                        style={{ fill: data.colorScheme.textColor }}
                      />
                    </a>
                  </div>
                </>
              )}
              {email && (
                <div
                  onClick={() => handleAnalytics("email")}
                  className="h-12 w-12 rounded-full  flex justify-center items-center hover:opacity-75"
                  style={{ backgroundColor: data.colorScheme.brandColor }}
                >
                  <a href={`mailto:${email}`}>
                    <MailIcon
                      className="  h-7 w-7"
                      style={{ fill: data.colorScheme.textColor }}
                    />
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
                  onClick={() => {
                    getCard();
                    handleAnalytics("addCard");
                  }}
                  className={`text-small  font-medium pt-4 pb-4 mb-4 w-full rounded-2xl hover:opacity-75`}
                  style={{
                    backgroundColor: data.colorScheme.brandColor,
                    color: data.colorScheme.textColor,
                  }}
                >
                  {"Add To Contacts".toUpperCase()}
                </button>
                <button
                  onClick={() => {
                    shareCard();
                    handleAnalytics("qrCode");
                  }}
                  className={`text-small text-white font-medium pt-4 pb-4 mb-8 w-full rounded-2xl  hover:opacity-75`}
                  style={{
                    backgroundColor: data.colorScheme.brandColor,
                    color: data.colorScheme.textColor,
                  }}
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
              houseCountry={houseCountry}
              colorScheme={colorScheme}
            />

            <DisplayWorkInfo
              workCity={workCity}
              workState={workState}
              workStreet={workStreet}
              workzip={workzip}
              workAddressData={workAddressData}
              workCountry={workCountry}
            />
            {data.colorScheme && (
              <DisplaySocial
                socialData={socialData}
                colorScheme={data.colorScheme}
              />
            )}
          </div>
          <p className="col-span-4 pt-4 pb-8 md:pb-0 capitalize">
            made with{" "}
            <Link to={"/"}>
              <span
                className="cursor-pointer"
                style={{
                  color: colorScheme.brandColor,
                  fontWeight: 700,
                  textDecoration: `${colorScheme.brandColor} underline`,
                }}
              >
                BriteKard
              </span>
            </Link>
          </p>
        </div>
      );
    };
    if (pathname.includes("preview")) {
      return (
        <div className=" max-w-[1800px] px-[5%] sm:pb-6 sm:w-[calc(100%_-_100px)] lg:w-[calc(100%_-_300px)] ml-auto  pb-[120px] ">
        
          <div className=" mx-auto  ">
            <div className="flex flex-row items-end justify-between pb-10">
              <p className="  text-2xl font-bold  text-left  tracking-tight text-gray-900  mb-0 mt-10 ">
                Business Card Preview
              </p>
            </div>
            <div className=" w-full h-full sm:py-16 ">{cardView()}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className=" w-full h-full sm:py-16 "
          style={{ backgroundColor: Color(colorScheme.brandColor).alpha(0.05) }}
        > <Header username={username} photo={data?.photo}/>

          {cardView()}
        </div>
      );
    }
  }
  if (error) {
    return (
      <p className="pt-[30vh] flex justify-center align-center text-xl font-medium  text-left  tracking-tight text-gray-900  mb-0 mt-10 ">
        404 Page Not Found
      </p>
    );
  } else {
    return <LoadingScreen />;
  }
}
