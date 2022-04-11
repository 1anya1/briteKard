import React, { useState } from "react";
import SocialInputs from "../styling/SocialInputs";
import FormDescription from "../styling/FormDescription";
export default function SocialLinks() {
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
  const [formDescription] = useState([
    {
      formDescription: {
        title: "Social Profiles",
        description: " Use a permanent address where you can receive mail.",
      },
    },
  ]);
  return (
    <div className="container mx-auto pb-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <FormDescription formDescription={formDescription} />
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST">
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <SocialInputs site={site} />
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
