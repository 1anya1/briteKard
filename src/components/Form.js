import PersonalInfo from "./formType/PersonalInfo";
import SocialLinks from "./formType/SocialLikns";
import HomeAddress from "./formType/HomeAddress";
import GetVCard from "./GetVCard";
import Chips from "./Chips";
import React, { useState } from "react";
import WorkInfo from "./formType/WorkInfo";
import CoverPhoto from "./formType/CoverPhoto";
const axios = require("axios");
export default function Forms() {
  //Basic Info will always stay on as the minimum fields to fill out to generate or update vCard
  const [options, setOptions] = useState([
    [{ name: "Social", toggle: true }],
    [{ name: "Photos", toggle: true }],
    [{ name: "Home Address", toggle: true }],
    [{ name: "Work Info", toggle: true }],
    [{ name: "Cover Photo", toggle: true }],
  ]);
  const [qr, setQr] = useState("");
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [userInputs, setUserInputs] = useState({
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
      mediaType: "PNG",
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
    let user = {
      username: userInputs.firstName.trim(),
    };
    let body = { ...user, vCard: [userInputs] };
    console.log(body);
    sendData(body);
  }
  const sendData = async (body) => {
    try {
      const response = await axios.post("http://localhost:3000/vCards", body);
      const [qr, username, id] = response.data;
      console.log(response);
      setUsername(username);
      setId(id);
      setQr(qr);
      console.log("updated", { qr });
      sendQR(username, id, qr);
    } catch (error) {
      console.log(error);
    }
  };

  const sendQR = async (username, id, qr) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/vCards/mycard/${username}/${id}`,
        {
          qrCode: qr,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  function imageConvert(base64, type, id) {
    console.log(base64, type);
    const copyObj = { ...userInputs };
    if (id === "photo") {
      copyObj.photo.url = base64;
      copyObj.photo.base64 = true;
      setUserInputs(copyObj);
    } else {
      copyObj.logo.url = base64;
      copyObj.logo.base64 = true;
      setUserInputs(copyObj);
    }
  }

  const handleChange = (event) => {
    const userObj = { ...userInputs };
    const value = event.target.value;
    let objKey = event.target.getAttribute("id");
    objKey = objKey.split(".");
    if (objKey.length === 1) {
      userObj[objKey[0]] = value;
    } else {
      userObj[objKey[0]][objKey[1]] = value;
    }

    setUserInputs(userObj);
  };
  function toggle(e) {
    //creating a new instance of our state
    let newOptions = [...options];
    //updating specific value according to click value
    newOptions[e][0].toggle = !newOptions[e][0].toggle;
    //set new state with update components will automatically update our child component
    setOptions(newOptions);
  }

  return (
    <div>
      <GetVCard username={username} id={id} />
      <div className="flex flex-row flex-nowrap flex-none gap-x-8 overflow-scroll scrollbar-hide my-8">
        <Chips options={options} toggle={toggle} />
      </div>
      <div className="container mx-auto pb-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-3">
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
                if (el[0].toggle && el[0].name === "Social") {
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
                  return <CoverPhoto key={idx} imageConvert={imageConvert} />;
                } else {
                  return null;
                }
              })}
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-blue-400 shadow-sm text-sm font-medium rounded-2xl text-white bg-blue-400 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
