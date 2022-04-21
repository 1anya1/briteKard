import PersonalInfo from "./Form Sections/PersonalInfo";
import SocialLinks from "./Form Sections/SocialLikns";
import HomeAddress from "./Form Sections/HomeAddress";
import GetVCard from "../Display Card/Display Sections/Display Functions/GetVCard";
import Chips from "./Form Sections/Chips";
import React, { useEffect, useState } from "react";
import WorkInfo from "./Form Sections/WorkInfo";
import CoverPhoto from "./Form Sections/CoverPhoto";
import { Link } from "react-router-dom";
const axios = require("axios");
export default function Forms(props) {
  //Basic Info will always stay on as the minimum fields to fill out to generate or update vCard
  const [submission, setSubmission] = useState(false);
  const [options, setOptions] = useState([
    [{ name: "Home Address", toggle: false }],
    [{ name: "Work Info", toggle: false }],
    [{ name: "Social Links", toggle: false }],
    [{ name: "Cover Photo", toggle: false }],
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
                  return <CoverPhoto key={idx} imageConvert={imageConvert} />;
                } else {
                  return null;
                }
              })}
              <button
                type="submit"
                className=" w-full sm:w-44 inline-flex justify-center py-2 px-4 border border-gray-500 shadow-sm text-sm font-medium rounded-2xl text-white bg-gray-500 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-8"
              >
                <p className="leading-relaxed text-sm">Create Card</p>
              </button>
            </form>
          </div>
        </div>
      )}
      {submission && (
        <div className=" max-w-screen-sm mx-auto ">
          <GetVCard username={props.username} id={props.id} />
          <button className="text-small text-white font-medium pt-4 pb-4 mb-8 w-full bg-gray-800 rounded-2xl  hover:bg-opacity-70 ">
            <Link to={`/mycard/${props.username}/${props.id}`}>
              View Digital Business Card
            </Link>
          </button>
          <button className="text-small text-white font-medium pt-4 pb-4 mb-8 w-full bg-gray-500 rounded-2xl  hover:bg-opacity-70 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-500">
            Create New Business Card
          </button>
        </div>
      )}
    </>
  );
}
