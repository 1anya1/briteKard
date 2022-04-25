import PersonalInfo from "./Form Sections/PersonalInfo";
import SocialLinks from "./Form Sections/SocialLikns";
import HomeAddress from "./Form Sections/HomeAddress";
import Chips from "./Form Sections/Chips";
import React, { useEffect, useState } from "react";
import WorkInfo from "./Form Sections/WorkInfo";
import CoverPhoto from "./Form Sections/CoverPhoto";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import { Buffer } from "buffer";
const axios = require("axios");
export default function Forms(props) {
  //Basic Info will always stay on as the minimum fields to fill out to generate or update vCard
  const [submittedUpdate, setSubmittedUpdate] = useState(false);

  const navigate = useNavigate();
  const [options, setOptions] = useState([
    [{ name: "Home Address", toggle: false }],
    [{ name: "Work Info", toggle: false }],
    [{ name: "Social Links", toggle: false }],
    [{ name: "Cover Photo", toggle: false }],
  ]);
  const [id, setId] = useState("");
  const [qr, setQR] = useState(0);
  const [userInputs, setUserInputs] = useState({
    username: "Anna",
    cardName: "",
    colorScheme: "",
    uid: "",
    birthday: "",
    cellPhone: "",
    pagerPhone: "",
    email: "",
    workEmail: "",
    firstName: "",
    formattedName: "",
    gender: "",
    homeAddress: {
      label: "",
      street: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      countryRegion: "",
    },
    homePhone: "",
    homeFax: "",
    lastName: "",
    logo: {
      url: "",
      mediaType: "",
      base64: false,
    },
    middleName: "",
    namePrefix: "",
    nameSuffix: "",
    nickname: "",
    note: "",
    organization: "",
    photo: {
      url: "",
      mediaType: "",
      base64: false,
    },
    role: "",
    socialUrls: {
      facebook: "",
      linkedIn: "",
      twitter: "",
      flickr: "",
      github: "",
    },
    source: "",
    title: "",
    url: "",
    workUrl: "",
    workAddress: {
      label: "",
      street: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      countryRegion: "",
    },
    workPhone: "",
    workFax: "",
    qrCode: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    let body = userInputs;

    sendData(body);
  }
  function sendData(body) {
    setSubmittedUpdate(true);
    console.log(body);
    axios
      .post("https://britekard.herokuapp.com/vCards", body)
      .then((response) => {
        console.log(response);
        const [qr, username, id] = response.data;
        console.log(qr, username, id);
        props.setId(id);
        const tobuff = qr.split(",");
        setQR(new Buffer.from(tobuff[1], "base64"));
        setId(id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    if (id && id) {
      sendQR(id, qr);
    }
  });
  function sendQR(id, qr) {
    axios
      .post(
        `https://britekard.herokuapp.com/vCards/mycard/${props.username}/${id}`,
        {
          qrCode: qr,
        }
      )
      .then((res) => {
        navigate(`/myCards/${props.username}`);
      })
      .catch((err) => console.error(err));
  }

  function imageConvert(base64, type, id) {
    const copyObj = { ...userInputs };
    if (id === "photo") {
      const img = base64.split(",");
      const fileContents = new Buffer.from(img[1], "base64");

      copyObj.photo.url = fileContents;
      copyObj.photo.mediaType = type;
      copyObj.photo.base64 = true;
      setUserInputs(copyObj);
    } else {
      const img = base64.split(",");
      const fileContents = new Buffer.from(img[1], "base64");

      copyObj.logo.url = fileContents;
      copyObj.logo.mediaType = type;
      copyObj.logo.base64 = true;
      setUserInputs(copyObj);
    }
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

  function handleChange(event) {
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

    if (objKey) objKey = objKey.split(".");
    if (objKey.length === 1) {
      userObj[objKey[0]] = value;
    } else {
      userObj[objKey[0]][objKey[1]] = value;
    }
    userObj[objKey] = value;

    setUserInputs(userObj);
  }
  function toggle(e) {
    let newOptions = [...options];
    newOptions[e][0].toggle = !newOptions[e][0].toggle;
    setOptions(newOptions);
  }
  if (submittedUpdate || !userInputs) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="container mx-auto gap-2 max-w-4xl m-auto">
        <div className="container mx-auto sm:px-4">
          <p className="text-center font-medium text-gray-600 text-xl pt-8 ">
            Create New Business Card
          </p>
          <div className="flex flex-row flex-nowrap overflow-scroll scrollbar-hide my-8 pl-4 sm:pl-0 container mx-auto gap-2">
            <Chips options={options} toggle={toggle} />
          </div>
        </div>
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit}>
            <PersonalInfo
              handleChange={handleChange}
              userInputs={userInputs}
              imageConvert={imageConvert}
            />
            {options.map((el, idx) => {
              if (el[0].toggle && el[0].name === "Home Address") {
                return (
                  <HomeAddress
                    key={idx}
                    handleChange={handleChange}
                    userInputs={userInputs}
                  />
                );
              }
              if (el[0].toggle && el[0].name === "Social Links") {
                return (
                  <SocialLinks
                    key={idx}
                    handleChange={handleChange}
                    userInputs={userInputs}
                  />
                );
              }
              if (el[0].toggle && el[0].name === "Work Info") {
                return (
                  <WorkInfo
                    key={idx}
                    handleChange={handleChange}
                    userInputs={userInputs}
                  />
                );
              }
              if (el[0].toggle && el[0].name === "Cover Photo") {
                return (
                  <CoverPhoto
                    key={idx}
                    imageConvert={imageConvert}
                    logo={userInputs.logo.url}
                  />
                );
              } else {
                return null;
              }
            })}
            <button
              type="submit"
              className=" w-full sm:w-44 inline-flex justify-center py-2 px-4 border border-gray-500 shadow-sm text-sm font-medium rounded-2xl text-white bg-gray-500 hover:opacity-70 active:opacity-70 my-8"
            >
              <p className="leading-relaxed text-sm">Create Card</p>
            </button>
          </form>
        </div>
      </div>
    );
  }
}
