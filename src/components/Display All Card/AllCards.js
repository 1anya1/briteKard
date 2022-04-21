import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");
export default function AllCards(props) {
  const [data, setData] = useState(null);
  const id = [];
  //   const username = props.username;
  useEffect(() => {
    axios
      .get(`https://britekard.herokuapp.com/vCards/${props.username}`)
      .then((response) => {
        console.log(response.data[0].vCard);
        const data = response.data[0].vCard;
        setData(data);
      });
  }, [props.username]);

  for (let card in data) {
    console.log(data[card]);
    const { _id } = data[card];
    id.push(_id);
    console.log(id);
  }
  if (id) {
    return (
      <div>
        {id.map((card, id) => {
          return (
            <button
              key={id}
              className="text-small text-white font-medium pt-4 pb-4 mb-8 w-full bg-gray-500 rounded-2xl  hover:bg-opacity-70 "
            >
              <Link to={`/mycard/${props.username}/${card}`}>Card</Link>
            </button>
          );
        })}
      </div>
    );
  }
}
