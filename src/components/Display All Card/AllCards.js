import { useEffect, useState } from "react";
import { DocumentTextIcon, UserCircleIcon } from "@heroicons/react/solid";
import { useParams, useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import { Buffer } from "buffer";
import ShareModal from "./ShareModal";
import DeleteFormModal from "../Form/Input Styles/DeleteFormModal";

const axios = require("axios");
export default function AllCards(props) {
  console.log(props);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentCard, setCurrentCard] = useState("");

  const username = props.username;

  const [data, setData] = useState(false);
  console.log(useParams);
  const displayCard = [];

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 1000);
    return () => {
      clearTimeout(timeId);
    };
  }, [show]);

  const handleModal = (card) => {
    setOpen(true);
    setCurrentCard(card);
  };
  useEffect(() => {
    console.log("here");
    if (username) {
      axios
        .get(`https://britekard.herokuapp.com/vCards/${username}`)
        .then((response) => {
          console.log(response);
          setData(response.data);
        });
    }
  }, [username]);

  useEffect(() => {
    console.log({ currentCard });
  }, [currentCard]);

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
  const deleteCard = (card) => {
    setCurrentCard(card);
    setDeleteModal(true);
  };

  if (displayCard.length > 0) {
    return (
      <div className="sm:grid grid-cols-2 gap-6 max-w-4xl m-auto p-4 ">
        {open && (
          <ShareModal card={currentCard} open={open} setOpen={setOpen} />
        )}
        {deleteModal && (
          <DeleteFormModal
            open={deleteModal}
            setOpen={setDeleteModal}
            card={currentCard}
            username={username}
          />
        )}
        {displayCard.map((card, id) => {
          return (
            <div
              key={id}
              className="drop-shadow-md  border-gray-100 border h-52 sm:h-60 w-full sm:w-full text-small text-gray-500 font-medium mb-4 sm:mb-0 bg-white rounded-2xl  flex flex-col justify-between p-4 sm:p-6 "
            >
              <div className="flex justify-between items-center pb-4">
                <div className="h-20 w-20 rounded-full overflow-hidden  border-4 border-gray-200 ">
                  {card.image === "data:;base64," ? (
                    <div className=" w-full h-full flex items-center justify-center">
                      <UserCircleIcon className="h-2/3 w-2/3 fill-gray-300" />
                    </div>
                  ) : (
                    <img
                      className="object-cover h-20 w-20 "
                      src={card.image}
                      alt="profile"
                    />
                  )}
                </div>

                <p className="font-bold text-xl">{card.name}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => navigate(`/mycard/preview/${card.id}`)}
                  className="w-[49%]  border p-1  font-medium border-gray-500  rounded-md bg-white  hover:bg-gray-500 hover:text-white text-gray-500"
                >
                  Preview
                </button>
                <button
                  onClick={() => handleModal(card)}
                  className="w-[49%] border p-1  font-medium border-gray-500  rounded-md bg-white  hover:bg-gray-500 hover:text-white text-gray-500"
                >
                  Share
                </button>

                <button
                  onClick={() => navigate(`/mycard/update/${card.id}`)}
                  className="w-[49%] border p-1  font-medium border-gray-500  rounded-md bg-white  hover:bg-gray-500 hover:text-white text-gray-500"
                >
                  Edit
                </button>

                <button
                  onClick={()=>deleteCard(card)}
                  className="w-[49%] border p-1  font-medium border-gray-500  rounded-md bg-white  hover:bg-gray-500 hover:text-white text-gray-500"
                >
                  Delete
                </button>
              </div>

              {/* <div
                onClick={() => handleModal(card)}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-400 hover:bg-purple-300 md:py-4 md:text-lg md:px-10 cursor-pointer"
              >
                Share
              </div> */}
            </div>
          );
        })}
      </div>
    );
  } else if (!data && username) {
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
