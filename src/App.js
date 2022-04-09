import "./App.css";
import { createRoot } from "react-dom/client";
import {
  PhoneOutgoingIcon,
  MailIcon,
  GlobeAltIcon,
} from "@heroicons/react/solid";

export default function App() {
  return (
    <div className="2xl:container 2xl:mx-auto">
      <GetVCard />
    </div>
  );
}
function GetVCard() {
  async function getCard() {
    console.log("clicked");
    await fetch("http://localhost:3000/vCards/Map/6250d30d4ff4877952abf798")
      .then(function (response) {
        return response.text();
      })
      .then(function (data) {
        download("dante.VCF", data);
        console.log(data);
      });
  }

  function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  return <button onClick={getCard}>Get My Card</button>;
}
function VCard() {
  return (
    <div className="md:container md:mx-auto">
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        <PhoneOutgoingIcon
          className="fill-black hover:fill-yellow "
          xmlns="http://www.w3.org/2000/svg"
        />
        <MailIcon
          className="fill-black hover:fill-yellow "
          xmlns="http://www.w3.org/2000/svg"
        />
        <GlobeAltIcon
          className="fill-black hover:fill-yellow "
          xmlns="http://www.w3.org/2000/svg"
        />
      </div>
    </div>
  );
}

const container = document.createElement("div");
const root = createRoot(container);
root.render(<App tab="home" />);
