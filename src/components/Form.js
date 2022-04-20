import PersonalInfo from "./formType/PersonalInfo";
import SocialLinks from "./formType/SocialLikns";
import HomeAddress from "./formType/HomeAddress";
import GetVCard from "./GetVCard";
import Chips from "./Chips";
import React, { useEffect, useState } from "react";
import WorkInfo from "./formType/WorkInfo";
import CoverPhoto from "./formType/CoverPhoto";
import { Link } from "react-router-dom";
const axios = require("axios");
export default function Forms(props) {
  //Basic Info will always stay on as the minimum fields to fill out to generate or update vCard
  const [submission, setSubmission] = useState(false);
  const [options, setOptions] = useState([
    [{ name: "Social", toggle: true }],
    [{ name: "Photos", toggle: true }],
    [{ name: "Home Address", toggle: true }],
    [{ name: "Work Info", toggle: true }],
    [{ name: "Cover Photo", toggle: true }],
  ]);
  const [id, setId] = useState("");
  const [qr, setQR] = useState(0);
  const [userInputs, setUserInputs] = useState({
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
    let body = { username: props.username, vCard: [userInputs] };
    console.log("step one complete send body");
    console.log(body);
    sendData(body);
  }
  function sendData(body) {
    axios
      .post("https://britekard.herokuapp.com/vCards", body)
      .then((response) => {
        const [qr, username, id] = response.data;
        console.log(qr, username, id);
        props.setId(id);
        setId(id);
        setQR(qr);
      })
      .then(() => {
        console.log("im here");

        // sendQR(props.id, qr);
        // getId();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    if (id && id) {
      console.log(qr, id);
      sendQR(id, qr);
    }
  });
  function sendQR(id, qr) {
    console.log("now im here");
    axios
      .post(
        `https://britekard.herokuapp.com/vCards/mycard/${props.username}/${id}`,
        {
          qrCode: qr,
        }
      )
      .then((res) => {
        console.log("succesfull stuff to be done here");
        setSubmission(true);
      })
      .catch((err) => console.error(err));
  }

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
    <>
      {!submission && (
        <>
          <div className="flex flex-row flex-nowrap flex-none gap-x-8 overflow-scroll scrollbar-hide my-8">
            <Chips options={options} toggle={toggle} />
          </div>
          <div className="container mx-auto px-16">
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
        </>
      )}
      {submission && (
        <div className=" max-w-screen-sm mx-auto ">
          <GetVCard username={props.username} id={props.id} />
          <button className="text-small text-white font-medium pt-4 pb-4 mb-8 w-full bg-gray-500 rounded-2xl  hover:bg-opacity-70 ">
            <Link to={`/mycard/${props.username}/${props.id}`}>
              View Digital Business Card
            </Link>
          </button>
          <button className="text-small text-white font-medium pt-4 pb-4 mb-8 w-full bg-gray-500 rounded-2xl  hover:bg-opacity-70 ">
            Create New Business Card
          </button>
        </div>
      )}
    </>
  );
}
