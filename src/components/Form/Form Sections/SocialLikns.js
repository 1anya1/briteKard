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
  const [show, setShow] = useState(false);

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
    setInput("");
  }
  //handle change event in addition of new input field
  // function handleChange(e) {
  //   setInput(e.target.value);
  // }
  const socialMedia = [
    "TicTok",
    "Instagram",
    "Snapcaht",
    "Tumblr",
    "YouTube",
    "Meetup",
    "Twitch",
    "GitHub",
  ];
  return (
    <div className="drop-shadow-md  border-gray-100 border rounded-2xl bg-snow mb-5 max-w-[1800px] m-auto relative z-10">
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
          <div
            id="social-media"
            name="social-media"
            // onChange={handleChange}
            onClick={() => setShow(!show)}
            autoComplete="social-media"
            className="relative z-10 h-12 mt-1  w-full py-2 px-3 border text-gray-500 border-gray-300 bg-white leading-none rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm flex items-center "
          >
            <p className={`${input ? 'text-gray-900' : 'text-gray-500'}`}>{input ? input : "More Options"}</p>
            <div
              className={`absolute  bg-white border border-gray-400 top-[40px] w-[calc(100%_+_2px)] left-[-1px] z-20 rounded-b-md overflow-hidden ${
                show ? "block " : "hidden"
              }`}
            >
              {socialMedia.map((el) => (
                <p
                  key={el}
                  onClick={() => setInput(el)}
                  className="hover:bg-purple-50 p-2"
                >
                  {el}
                </p>
              ))}
            </div>
          </div>

          <button
            disabled={input ? false : true}
            onClick={addMore}
            className={` justify-center mt-1 py-2 px-4 border  text-xs font-medium rounded-md text-white  hover:opacity-70 active:opacity-70 ml-3 ${
              input ? "bg-purple-400 curson-pointer" : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
