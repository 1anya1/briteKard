import PersonalInfo from "./Form Sections/PersonalInfo";
import SocialLinks from "./Form Sections/SocialLikns";
import HomeAddress from "./Form Sections/HomeAddress";
// import Chips from "./Form Sections/Chips";
import React, { useEffect, useState } from "react";
import WorkInfo from "./Form Sections/WorkInfo";
import CoverPhoto from "./Form Sections/CoverPhoto";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import ColorPicker from "./ColorSelect";
import CardName from "./Form Sections/CardName";

const axios = require("axios");
export default function Forms(props) {
  //Basic Info will always stay on as the minimum fields to fill out to generate or update vCard
  const [submittedUpdate, setSubmittedUpdate] = useState(false);

  const navigate = useNavigate();
  const [options, setOptions] = useState([
    // { name: "Home Address", toggle: false },
    // { name: "Work Info", toggle: false },
    // { name: "Social Links", toggle: false },
    // { name: "Cover Photo", toggle: false },
    // [{ name: "Choose Theme", toggle: false }],
    { name: "Home Address", toggle: true },
    { name: "Work Info", toggle: true },
    { name: "Social Links", toggle: true },
    { name: "Cover Photo", toggle: true },
  ]);

  const [id, setId] = useState("");
  const [qr, setQR] = useState(0);

  const [userInputs, setUserInputs] = useState({
    username: "",
    cardName: "",
    colorScheme: "gray-500",
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
    logo: "",
    middleName: "",
    namePrefix: "",
    nameSuffix: "",
    nickname: "",
    note: "",
    organization: "",
    photo: "",
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

  const [nameError, setNameError] = useState(false);
  const [cellError, setCellError] = useState(false);
  const [cardNameError, setCardNameError] = useState(false);
  const [existingTitles, setTitles] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    userInputs.username = props.username;
    let body = userInputs;
    const duplicate = existingTitles.indexOf(userInputs.cardName) !== -1;
    if (duplicate) {
      setCardNameError(true);
    }
    if (body.firstName === "") {
      setNameError(true);
    }
    if (body.cellPhone === "") {
      setCellError(true);
    } else {
      if (!cardNameError) {
        sendData(body);
      }
    }
  }
  useEffect(() => {
    const duplicate = existingTitles.indexOf(userInputs.cardName) !== -1;
    if (!duplicate) {
      setCardNameError(false);
    }
    if (userInputs.firstName.length > 0) {
      setCardNameError(false);
    }
    if (userInputs.cellPhone.length > 0) {
      setCardNameError(false);
    }
  }, [existingTitles, userInputs]);

  useEffect(() => {
    if (props.username) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/vCards/${props.username}`)
        .then((response) => {
          const titles = [];
          const data = response.data;
          data.forEach((el) => {
            if (el.cardName) {
              titles.push(el.cardName);
            }
          });
          setTitles([...titles]);
        });
    }
  }, [props.username]);

  function sendData(body) {
    setSubmittedUpdate(true);

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/vCards`, body)
      .then((response) => {
        const [qr, , id] = response.data;
        props.setId(id);
        setQR(qr);
        setId(id);
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
        ` ${process.env.REACT_APP_BACKEND_URL}/vCards/mycard/${props.username}/${id}`,
        {
          qrCode: qr,
        }
      )
      .then((res) => {
        navigate(`/dashboard`);
      })
      .catch((err) => console.error(err));
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

  function handleImageChange(base64, type) {
    const userObj = { ...userInputs };
    if (type === "profile") {
      userObj.photo = base64;
    } else {
      userObj.logo = base64;
    }

    setUserInputs(userObj);
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
  // function toggle(e) {
  //   let newOptions = [...options];
  //   newOptions[e].toggle = !newOptions[e].toggle;
  //   setOptions(newOptions);
  // }
  if (submittedUpdate || !userInputs) {
    return <LoadingScreen />;
  } else {
    return (
      <div className=" max-w-[1800px] px-[5%] m-auto ">
        <div className=" mx-auto  ">
          <div className="flex flex-row items-end justify-between pb-10">
            <p className=" text-2xl font-bold  text-left  tracking-tight text-gray-900  mb-0 mt-10 ">
              Add New Card
            </p>
          </div>
          {/* <div className="flex flex-row flex-nowrap overflow-scroll scrollbar-hide my-8  container mx-auto gap-2">
            <Chips options={options} toggle={toggle} />
          </div> */}
          
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <CardName
              handleChange={handleChange}
              userInputs={userInputs}
              cardNameError={cardNameError}
            />
            <PersonalInfo
              handleChange={handleChange}
              userInputs={userInputs}
              cellError={cellError}
              nameError={nameError}
              setNameError={setNameError}
              setCellError={setCellError}
              handleImageChange={handleImageChange}
            />
            {options.map((el, idx) => {
              if (el.toggle && el.name === "Home Address") {
                return (
                  <HomeAddress
                    key={idx}
                    handleChange={handleChange}
                    userInputs={userInputs}
                  />
                );
              }
              if (el.toggle && el.name === "Social Links") {
                return (
                  <SocialLinks
                    key={idx}
                    handleChange={handleChange}
                    userInputs={userInputs}
                  />
                );
              }
              if (el.toggle && el.name === "Work Info") {
                return (
                  <WorkInfo
                    key={idx}
                    handleChange={handleChange}
                    userInputs={userInputs}
                  />
                );
              }
              if (el.toggle && el.name === "Cover Photo") {
                return (
                  <CoverPhoto key={idx} handleImageChange={handleImageChange} />
                );
              }
              if (el.toggle && el.name === "Choose Theme") {
                return <ColorPicker />;
              } else {
                return null;
              }
            })}
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start mb-8">
              <div className="rounded-md shadow w-full xl:w-[300px]">
                <button
                  noValidate
                  type="submit"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 md:py-4 md:text-lg md:px-10 cursor-pointer"
                >
                  <p className="leading-relaxed text-sm">Create Card</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
