import { useEffect, useState } from "react";
import {
  DuplicateIcon,
  DocumentTextIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import { useParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import { Buffer } from "buffer";

const axios = require("axios");
export default function AllCards(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [idx, setIDX] = useState(null);
  const { username } = useParams();
  const [data, setData] = useState(false);

  const displayCard = [];

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 1000);
    return () => {
      clearTimeout(timeId);
    };
  }, [show]);
  useEffect(() => {
    console.log("here");
    axios
      .get(`https://britekard.herokuapp.com/vCards/${username}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
      });
  }, [username]);
  console.log(data);
  for (let card in data) {
    const {
      _id,
      firstName,
      lastName,
      title,
      photo: { url, mediaType },
    } = data[card];
    const b64 = new Buffer.from(url).toString("base64");

    const imageConvert = `data:${mediaType};base64,${b64}`;

    const name = `${firstName} ${lastName}`;

    const display = {
      id: _id,
      name: name,
      jobTitle: title,
      image: imageConvert,
    };
    displayCard.push(display);
  }

  if (displayCard.length > 0) {
    return (
      <div className="sm:grid grid-cols-2 gap-6 max-w-4xl m-auto p-4 ">
        {displayCard.map((card, id) => {
          return (
            <div
              key={id}
              className="drop-shadow-md  border-gray-100 border h-52 sm:h-60 w-full sm:w-full text-small text-gray-500 font-medium mb-4 sm:mb-0 bg-white rounded-2xl  flex flex-col justify-between p-6 sm:p-10 "
            >
              <div className="flex justify-between items-center pb-4">
                <div className="h-14 w-14 rounded-full overflow-hidden">
                  {card.image === "data:;base64," ? (
                    <div className=" bg-gray-200 w-full h-full flex items-center justify-center">
                      <UserCircleIcon className="h-2/3 w-2/3 fill-gray-300" />
                    </div>
                  ) : (
                    <img
                      className="object-cover h-14 w-14"
                      src={card.image}
                      alt="profile"
                    />
                  )}
                </div>

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
                <p className="text-2xl text-gray-700">{card.name}</p>
                <p className="text-gray-600">{card.jobTitle}</p>
                <div className="flex items-center pt-3">
                  <p className="text-sm truncate w-3/4">
                    https://britekard.netlify.app/mycard/{props.username}/
                    {card.id}
                  </p>
                  <DuplicateIcon
                    className="h-7 w-7 fill-gray-400 hover:fill-gray-500"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://britekard.netlify.app/mycard/${props.username}/${card.id}`
                      );
                      setShow(true);
                      setIDX(id);
                    }}
                  />
                  {show && idx === id && (
                    <p
                      className=" text-xs text-gray-700 font-medium pl-2"
                      id={id}
                    >
                      Copied!
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  } else if (!data) {
    return <LoadingScreen />;
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
