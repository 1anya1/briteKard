import FormDescription from "../styling/FormDescription";
import FormInput from "./FormInput";
import personalDataInputs from "./FormData";
import ProfileImageInputs from "./ProfileImageInput";
import URLInputs from "./URLInputs";
// import React, { useRef } from "react";

export default function PersonalInfo(props) {
  const formName = "Personal Info";
  const formDescription = "this is my form description";

  return (
    <div className="md:grid md:grid-cols-3 md:gap-3 py-5">
      <FormDescription formName={formName} formDescription={formDescription} />
      <ProfileImageInputs
        imageConvert={props.imageConvert}
        imageData={props.userInputs.photo}
      />
      {personalDataInputs.map((el, idx) => {
        if (el[0].type === "url")
          return (
            <URLInputs
              key={idx}
              label={el[0].label}
              type={el[0].type}
              id={el[0].id}
              placeholder={el[0].placeholder}
              value={props.userInputs[el[0].id]}
              change={props.handleChange}
            />
          );
        else {
          return (
            <FormInput
              key={idx}
              label={el[0].label}
              type={el[0].type}
              id={el[0].id}
              placeholder={el[0].placeholder}
              value={props.userInputs[el[0].id]}
              change={props.handleChange}
            />
          );
        }
      })}
    </div>
  );
}
