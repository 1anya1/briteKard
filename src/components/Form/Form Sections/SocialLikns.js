import React, { useState } from "react";
import URLInputs from "../Input Styles/URLInputs";
import FormDescription from "../Input Styles/FormDescription";
import { socialLinksInputs } from "../Form Data/FormData";
export default function SocialLinks(props) {
  //info about the form
  const formName = "Social Links";

  //state management of inputs that belong to Social Links
  const [input, setInput] = useState("");
  const [site, setSite] = useState(socialLinksInputs);

  //Add another social channels
  function addMore(e) {
    e.preventDefault();
    const duplicateState = [...site];
    const data = {
      label: input,
      type: "text",
      id: `socialUrls.${input.toLowerCase()}`,
      placeholder: "example.com",
      value: ["socialUrls", `${input.toLowerCase()}`],
    };
    duplicateState.push(data);
    setSite(duplicateState);
  }
  //handle change event in addition of new input field
  function handleChange(e) {
    setInput(e.target.value);
  }
  return (
    <div className="drop-shadow-md  border-gray-100 border rounded-2xl bg-snow mb-5 max-w-[1800px] m-auto">
      <div className=" p-4 md:grid md:grid-cols-3 md:gap-3  sm:p-8">
        <FormDescription formName={formName} />
        {site.map((el, idx) => (
          <URLInputs
            key={idx}
            label={el.label}
            type={el.type}
            id={el.id}
            // placeholder={el.placeholder}
            value={props.userInputs[el.value[0]][el.value[1]]}
            change={props.handleChange}
          />
        ))}
        <div className="col-start-2 col-span-2 pb-4 flex">
          <select
            id="social-media"
            name="social-media"
            onChange={handleChange}
            autoComplete="social-media"
            className="h-12 mt-1 block w-full py-2 px-3 border text-gray-500 border-gray-300 bg-white leading-none rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
          >
            <option value="" >
              More Options
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
            className="  justify-center mt-1 py-2 px-4 border  text-xs font-medium rounded-md text-white bg-gray-500 hover:opacity-70 active:opacity-70 ml-3"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
