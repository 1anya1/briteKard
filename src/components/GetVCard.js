const axios = require("axios");
export default function GetVCard() {
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
