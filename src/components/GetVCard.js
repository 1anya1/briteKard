const axios = require("axios");
export default function GetVCard() {
  async function getCard() {
    console.log("clicked");
    axios
      .get("http://localhost:3000/vCards/anya/62589c32f642c247aa3efea8")
      .then(function (response) {
        console.log(response);
        download(`${response.data[1]}.VCF`, response.data[0]);
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
