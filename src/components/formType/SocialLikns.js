import React, { useState } from "react";
import SocialInputs from "../styling/SocialInputs";
import FormDescription from "../styling/FormDescription";
export default function SocialLinks() {
  const formName = "Social Links";
  const formDescription = "this is my form description";

  const [site] = useState([
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

  return (
    <div className="md:grid md:grid-cols-3 md:gap-3 pb-8">
      <FormDescription formName={formName} formDescription={formDescription} />
      <SocialInputs site={site} />
    </div>
  );
}
