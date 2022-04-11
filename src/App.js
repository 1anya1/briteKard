import "./App.css";
import { createRoot } from "react-dom/client";
import Forms from "./components/Form";
import Layouts from "./components/Layouts";
import Hero from "./components/Hero";
import Feature from "./components/FeatureSection";
import CTA from "./components/CTA";
import VCard from "./components/SVG";
import Chips from "./components/formType/Chips";
import React, { useState } from "react";

const axios = require("axios");

export default function App() {
  const [options, setOptions] = useState([
    {
      options: {
        name: "Basic Information",
        toggle: false,
      },
    },
    {
      options: {
        name: "Social",
        toggle: false,
      },
    },
    {
      options: {
        name: "Photos",
        toggle: false,
      },
    },
    {
      options: {
        name: "Address",
        toggle: false,
      },
    },
    {
      options: {
        name: "About",
        toggle: false,
      },
    },
  ]);
  // const [on, setOn] = useState(false);

  function click(e) {
    console.log(e);
    const node = e.target.nodeName;
    if (node === "SPAN") {
      const text = e.target.childNodes[0];
      const button = e.target.childNodes[1];
      console.log(text, button);
      // setOn((on) => !on);
    }
  }

  return (
    <div className="2xl:container 2xl:mx-auto">
      <div
        onClick={click}
        className="flex flex-row flex-nowrap flex-none gap-x-8 overflow-scroll"
      >
        <Chips options={options} />
      </div>
      <GetVCard />
      <Forms />

      <VCard />
    </div>
  );
}
function GetVCard() {
  async function getCard() {
    console.log("clicked");
    axios
      .get(
        "https://britekard.herokuapp.com/vCards/Map/6250d30d4ff4877952abf798"
      )
      .then(function (response) {
        download("dante.VCF", response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  function download(filename, text) {
    console.log("here");
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/vcard;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  return <button onClick={getCard}>Get My Card</button>;
}

const container = document.createElement("div");
const root = createRoot(container);
root.render(<App tab="home" />);
