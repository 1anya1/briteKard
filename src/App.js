import "./App.css";
import { createRoot } from "react-dom/client";
const axios = require("axios");

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
    axios
      .get("http://localhost:3000/vCards/Map/6250d30d4ff4877952abf798")
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
