import PersonalInfo from "./Form Sections/PersonalInfo";
import SocialLinks from "./Form Sections/SocialLikns";
import HomeAddress from "./Form Sections/HomeAddress";
import Chips from "./Form Sections/Chips";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WorkInfo from "./Form Sections/WorkInfo";
import CoverPhoto from "./Form Sections/CoverPhoto";
import DeleteFormModal from "./Input Styles/DeleteFormModal";

const axios = require("axios");
export default function UpdateForm(props) {
  const navigate = useNavigate();
  const { username, id } = useParams();
  const [deleteMe, setDeleteMe] = useState(false);

  //Basic Info will always stay on as the minimum fields to fill out to generate or update vCard

  const [options, setOptions] = useState([
    [{ name: "Home Address", toggle: false }],
    [{ name: "Work Info", toggle: false }],
    [{ name: "Social Links", toggle: false }],
    [{ name: "Cover Photo", toggle: false }],
  ]);

  const [userInputs, setUserInputs] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://britekard.herokuapp.com/vCards/mycard/update/${username}/${id}`
      )
      .then((response) => {
        console.log(response.data.vCard[0]);
        setUserInputs(response.data.vCard[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id, username]);
  function handleSubmit(event) {
    event.preventDefault();
    let body = userInputs;
    console.log(body);
    sendData(body);
  }
  function sendData(body) {
    axios
      .post(
        `https://britekard.herokuapp.com/vCards/mycard/update/${username}/${id}`,
        body
      )
      .then((response) => {
        console.log(response);
      })
      .then(() => {
        navigate(-1);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function deleteCard() {
    console.log("imhere");
    setDeleteMe(!deleteMe);
  }

  function cardDeletion() {
    axios
      .delete(
        `https://britekard.herokuapp.com/vCards/mycard/delete/${username}/${id}`
      )
      .then((response) => {
        setDeleteMe(!deleteMe);
        // setSuccessfuleDeletion(true);
        navigate(-1);
      })
      .catch(function (error) {
        console.log(error);
      });
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
    console.log(objKey);
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

  if (userInputs) {
    return (
      <>
        <DeleteFormModal
          deleteMe={deleteMe}
          setDeleteMe={setDeleteMe}
          deleteCard={deleteCard}
          cardDeletion={cardDeletion}
          username={username}
        />
        <div className="container mx-auto gap-2 max-w-4xl m-auto">
          <div className="container mx-auto sm:px-4">
            <p className="text-center font-medium text-gray-600 text-xl pt-8 ">
              Update Business Card
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
                className=" sm:mr-4 w-full sm:w-44 inline-flex justify-center py-2 px-4 border border-gray-500 shadow-sm text-sm font-medium rounded-2xl text-white bg-gray-500 hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-4"
              >
                <p className="leading-relaxed text-sm">Update Card</p>
              </button>
            </form>
            <button
              onClick={deleteCard}
              className=" w-full sm:w-44 inline-flex justify-center py-2 px-4 border border-red  shadow-sm text-sm font-medium rounded-2xl text-red  hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mb-8"
            >
              Delete
            </button>
          </div>
        </div>
      </>
    );
  }
}
