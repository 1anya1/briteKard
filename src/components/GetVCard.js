const axios = require("axios");
export default function GetVCard(props) {
  async function getCard() {
    console.log("clicked");
    console.log(props.username, props.id);
    axios
      .get(
        `https://britekard.herokuapp.com/vCards/${props.username}/${props.id}`
      )
      .then(function (response) {
        console.log(response.data[0]);
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
    console.log(element);
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  return <button onClick={getCard}>Get My Card</button>;
}
