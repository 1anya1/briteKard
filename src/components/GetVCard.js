const axios = require("axios");
export default function GetVCard(props) {
  function getCard() {
    console.log("clicked");
    console.log(props.username, props.id);
    axios
      .get(
        `https://britekard.herokuapp.com/vCards/${props.username}/${props.id}`
      )
      .then(function (response) {
        console.log(response.data[0]);
        download(`${props.username}.VCF`, response.data[0]);
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

  return (
    <button
      className="text-small text-white font-medium pt-4 pb-4 mb-8 w-full bg-gray-500 rounded-2xl  hover:bg-opacity-70 "
      onClick={getCard}
    >
      Download VCard
    </button>
  );
}
