import PersonalInfo from "./formType/PersonalInfo";
import SocialLinks from "./formType/SocialLikns";
import HomeAddress from "./formType/HomeAddress";
import Chips from "./formType/Chips";
import React, { useState } from "react";
import WorkInfo from "./formType/WorkInfo";
const axios = require("axios");
export default function Forms() {
  //Basic Info will always stay on as the minimum fields to fill out to generate or update vCard
  const [options, setOptions] = useState([
    [{ name: "Social", toggle: true }],
    [{ name: "Photos", toggle: true }],
    [{ name: "Home Address", toggle: true }],
    [{ name: "Work Info", toggle: true }],
  ]);
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
    console.log(event);
    console.log(userInputs);
    let username = {
      username: "anya",
    };
    let body = { ...username, vCard: [userInputs] };
    console.log(body);
    sendData(body);
  }
  function sendData(body) {
    axios
      .post("http://localhost:3000/vCards", body)
      .then(function (response) {
        const [qr, username, id] = response.data;
        console.log({ qr }, { username }, { id });
        console.log(response);
        // sendQR(body.vCard, qr, username, id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function sendQR(body, qr, username, id) {
    axios
      .post(`http://localhost:3000/vCards/${username}`, {
        username: username,
        qr: qr,
        id: id,
        body: body,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function imageConvert(base64, type) {
    console.log(base64, type);
    const copyObj = { ...userInputs };
    copyObj.photo.url = base64;
    copyObj.photo.mediaType = type;
    copyObj.photo.base64 = true;
    setUserInputs(copyObj);
  }

  const handleChange = (event) => {
    const userObj = { ...userInputs };
    let objKey = event.target.getAttribute("id");
    objKey = objKey.split(".");
    if (objKey.length === 1) {
      userObj[objKey[0]] = event.target.value;
    } else {
      userObj[objKey[0]][objKey[1]] = event.target.value;
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
                } else {
                  return null;
                }
              })}
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
