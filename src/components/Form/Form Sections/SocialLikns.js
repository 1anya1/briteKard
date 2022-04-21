import React, { useState } from "react";
import URLInputs from "../Input Styles/URLInputs";
import FormDescription from "../Input Styles/FormDescription";
export default function SocialLinks(props) {
  //info about the form
  const formName = "Social Links";

  //state management of inputs that belong to Social Links
  const [input, setInput] = useState("");
  const [site, setSite] = useState([
    {
      label: "LinkedIn",
      type: "text",
      id: "socialUrls.linkedIn",
      placeholder: "example.com",
    },
    {
      label: "Facebook",
      type: "text",
      id: "socialUrls.facebook",
      placeholder: "example.com",
    },
    {
      label: "Twitter",
      type: "text",
      id: "socialUrls.twitter",
      placeholder: "example.com",
    },
  ]);

  //Add another social channel
  function addMore(e) {
    e.preventDefault();
    console.log("were here");
    console.log(e);
    const duplicateState = [...site];
    console.log(duplicateState);
    const data = {
      label: input,
      type: "text",
      id: `socialUrls.${input.toLowerCase()}`,
      placeholder: "example.com",
    };
    duplicateState.push(data);
    console.log(duplicateState);
    setSite(duplicateState);
    console.log(site);
  }
  //handle change event in addition of new input field
  function handleChange(e) {
    setInput(e.target.value);
  }
  return (
    <div className="drop-shadow-md  border-gray-100 border rounded-2xl bg-white mb-5 max-w-4xl m-auto">
      <div className=" p-4 md:grid md:grid-cols-3 md:gap-3  sm:p-8">
        <FormDescription formName={formName} />
        {site.map((el, idx) => (
          <URLInputs
            key={idx}
            label={el.label}
            type={el.type}
            id={el.id}
            placeholder={el.placeholder}
            value={props.userInputs[el.id]}
            change={props.handleChange}
          />
        ))}
        <div className="col-start-2 col-span-2 pb-4 flex">
          {/* <label
          htmlFor="social-media"
          className="block text-sm font-medium text-gray-700"
        >
          Additional Links
        </label> */}
          <select
            id="social-media"
            name="social-media"
            onChange={handleChange}
            autoComplete="social-media"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option slected="false" disabled>
              Choose
            </option>
            <option>YouTube</option>
            <option>Instagram</option>
            <option>Tumblr</option>
            <option>Snapchat</option>
            <option>TikTok</option>
            <option>Meetup</option>
            <option>Twitch</option>
            <option>GitHub</option>
          </select>
          <button
            onClick={addMore}
            className="ml-5 w-3/12 bg-white py-2 px-3 border border-blue-500 rounded-2xl shadow-sm text-xs leading-4 font-medium text-blue-500 hover:blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
