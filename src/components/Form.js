import BasicInfo from "./formType/BasicInfo";
import Profile from "./formType/Profile";
import SocialLinks from "./formType/SocialLikns";
import HomeAddress from "./formType/HomeAddress";
import Chips from "./formType/Chips";
import React, { useState } from "react";
export default function Forms() {
  //Basic Info will always stay on as the minimum fields to fill out to generate or update vCard
  const [options, setOptions] = useState([
    [{ name: "Social", toggle: true, id: <SocialLinks /> }],
    [{ name: "Photos", toggle: true, id: <Profile /> }],
    [{ name: "Address", toggle: true, id: <HomeAddress /> }],
    [{ name: "About", toggle: true, id: "" }],
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
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    console.log(userInputs);

    //getting all the values
    // console.log({ name }, { email }, { lastName });
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
              <BasicInfo
                handleChange={handleChange}
                userInputs={userInputs}
                imageConvert={imageConvert}
              />
              {options.map((el, idx) => {
                if (el[0].toggle && el[0].id) {
                  return <div key={idx}>{el[0].id}</div>;
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
