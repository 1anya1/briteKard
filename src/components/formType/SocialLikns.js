import React, { useState } from "react";
import SocialInputs from "../styling/SocialInputs";
import FormDescription from "../styling/FormDescription";
export default function SocialLinks() {
  const formName = "Social Links";
  const formDescription = "this is my form description";

  const [input, setInput] = useState("");

  const [site, setSite] = useState([
    {
      title: "LinkedIn",
    },
    {
      title: "Facebook",
    },
    {
      title: "Instagram",
    },
  ]);
  function addMore(e) {
    e.preventDefault();
    console.log("please add more");
    const duplicateState = [...site];
    console.log(duplicateState);
    duplicateState.push({ title: input });
    setSite(duplicateState);
  }

  function handleChange(e) {
    setInput(e.target.value);
    setSite("");
  }
  return (
    <div className="md:grid md:grid-cols-3 md:gap-3 py-5">
      <FormDescription formName={formName} formDescription={formDescription} />
      <SocialInputs site={site} />
      <div className="col-start-2 col-span-2 flex">
        <select
          id="social-media"
          name="social-media"
          onChange={handleChange}
          autoComplete="social-media"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option slected="true" disabled>
            Choose
          </option>
          <option>YouTube</option>
          <option>Twitter</option>
          <option>Tumblr</option>
          <option>Snapchat</option>
          <option>TikTok</option>
          <option>Meetup</option>
          <option>Twitch</option>
        </select>
        <button
          onClick={addMore}
          className="ml-5 w-3/12 bg-white py-2 px-3 border border-blue-500 rounded-2xl shadow-sm text-xs leading-4 font-medium text-blue-500 hover:blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add
        </button>
      </div>
    </div>
  );
}
