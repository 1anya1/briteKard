import { useEffect, useState } from "react";
import { DuplicateIcon, DocumentTextIcon } from "@heroicons/react/solid";
import { useParams, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

const axios = require("axios");
export default function AllCards(props) {
  const navigate = useNavigate();
  const { username } = useParams();
  const [data, setData] = useState(false);
  console.log(username);
  const displayCard = [];
  //   const username = props.username;
  useEffect(() => {
    axios
      .get(`https://britekard.herokuapp.com/vCards/${username}`)
      .then((response) => {
        const data = response.data[0].vCard;
        setData(data);
      });
  }, [username]);

  for (let card in data) {
    const {
      _id,
      firstName,
      lastName,
      title,
      photo: { url },
    } = data[card];

    const name = `${firstName} ${lastName}`;

    const display = {
      id: _id,
      name: name,
      jobTitle: title,
      image: url,
    };
    displayCard.push(display);
  }
  console.log(displayCard);

  if (displayCard.length > 0) {
    return (
      <div className="sm:grid grid-cols-2 gap-6 max-w-4xl m-auto p-4 ">
        {displayCard.map((card, id) => {
          return (
            <div
              key={id}
              className="drop-shadow-md  border-gray-100 border h-52 sm:h-60 w-full sm:w-full text-small text-gray-500 font-medium mb-4 sm:mb-0 bg-white rounded-2xl  flex flex-col justify-between p-6 sm:p-10 "
            >
              <div className="flex justify-between items-center">
                {card.image && (
                  <div className="h-16 w-16 rounded-full overflow-hidden">
                    <img
                      className="object-cover"
                      src={card.image}
                      alt="profile"
                    />
                  </div>
                )}
                <div className="flex gap-2">
                  <div>
                    <button
                      onClick={() =>
                        navigate(`/mycard/update/${username}/${card.id}`)
                      }
                      className="bg-white hover:bg-gray-500 hover:text-white text-gray-500 border-gray-500 border px-3 py-1 text-xs font-medium rounded-xl "
                    >
                      Edit
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => navigate(`/mycard/${username}/${card.id}`)}
                      className="bg-white hover:bg-gray-500 hover:text-white text-gray-500 border-gray-500 border px-3 py-1 text-xs font-medium rounded-xl"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-2xl">{card.name}</p>
                <p>{card.jobTitle}</p>
                <div className="flex">
                  <p className="text-sm truncate pt-2 w-3/4">
                    https://britekard.netlify.app/mycard/{props.username}/
                    {card.id}
                  </p>
                  <DuplicateIcon
                    className="h-7 w-7 fill-gray-400 hover:fill-gray-500"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://britekard.netlify.app/mycard/${props.username}/${card.id}`
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else if (!data) {
    console.log("here");
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        <ThreeDots
          color="#3e404d"
          height={110}
          width={110}
          ariaLabel="three-circles-rotating"
        />
      </div>
    );
  } else {
    return (
      <>
        <DocumentTextIcon className="fill-gray-400 w-2/6 sm:w-2/6 m-auto" />
        <div className="font-medium text-xl sm:text-2xl text-gray-700 w-5/6 sm:w-4/6 m-auto center">
          You dont have any cards yet. Click button below to create your digital
          business card
        </div>
        <button>Create Card</button>
      </>
    );
  }
}
