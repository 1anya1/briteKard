import "./App.css";
import { createRoot } from "react-dom/client";

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
    var url = "data:text/vcard;charset=utf-8," + encodeURIComponent(text);

    // ask the browser to download it
    document.location.href = url;
  }

  return <button onClick={getCard}>Get My Card</button>;
}

const container = document.createElement("div");
const root = createRoot(container);
root.render(<App tab="home" />);
