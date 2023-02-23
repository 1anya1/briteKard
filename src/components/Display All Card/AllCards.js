import { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import ShareModal from "./ShareModal";
import DeleteFormModal from "../Form/Input Styles/DeleteFormModal";
import Lottie from "lottie-react";
import emptyBox from "../../images/lottie/empty-box.json";
import { Link } from "react-router-dom";

const axios = require("axios");
export default function AllCards(props) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentCard, setCurrentCard] = useState("");
  const username = props.username;
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

  const handleModal = (card) => {
    setOpen(true);
    setCurrentCard(card);
  };
  useEffect(() => {
    if (username) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/vCards/${username}`)
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        });
    }
  }, [username, deleteModal]);

  for (let card in data) {
    const { _id, firstName, lastName, title, photo } = data[card];

    const name = `${firstName} ${lastName}`;

    const display = {
      id: _id,
      name: name,
      jobTitle: title,
      image: photo,
    };
    displayCard.push(display);
  }
  const deleteCard = (card) => {
    setCurrentCard(card);
    setDeleteModal(true);
  };

  return (
    <div className=" max-w-[1800px] px-[5%] ">
      <div className=" mx-auto  ">
        <div className="flex flex-row items-end justify-between pb-10">
          <p className="  text-2xl font-bold  text-left  tracking-tight text-gray-900  mb-0 mt-10 ">
           My Business Cards
          </p>
        </div>
        {displayCard.length > 0 && (
          <div className="flex flex-row flex-wrap gap-3  ">
            {open && (
              <ShareModal
                card={currentCard}
                open={open}
                setOpen={setOpen}
                username={username}
              />
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
                  className="drop-shadow-md  border-gray-100 border  lg:w-[calc(50%_-_6px)] w-full sm:w-full text-small text-gray-500 font-medium mb-4 sm:mb-0 bg-white rounded-2xl  flex flex-col justify-between p-4 sm:p-6  h-max"
                >
                  <div className="flex justify-between items-center pb-4">
                    <div className="h-20 w-20 rounded-full overflow-hidden  border-4 border-gray-200 ">
                      {!card.image ? (
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
                      onClick={() =>
                        navigate(`/mycard/preview/${username}/${card.id}`)
                      }
                      className=" h-11 w-[calc(50%_-_2px)] border p-1  font-medium border-gray-500  rounded-md bg-white  hover:bg-gray-500 hover:text-white text-gray-500"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => handleModal(card)}
                      className=" h-11 w-[calc(50%_-_2px)] border p-1  font-medium border-gray-500  rounded-md bg-white  hover:bg-gray-500 hover:text-white text-gray-500"
                    >
                      Share
                    </button>

                    <button
                      onClick={() => navigate(`/mycard/update/${card.id}`)}
                      className="h-11 w-[calc(50%_-_2px)] border p-1  font-medium border-gray-500  rounded-md bg-white  hover:bg-gray-500 hover:text-white text-gray-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteCard(card)}
                      className=" h-11 w-[calc(50%_-_2px)] border p-1  font-medium border-gray-500  rounded-md bg-white  hover:bg-gray-500 hover:text-white text-gray-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!data && username && <LoadingScreen />}{" "}
        {displayCard.length < 1 && data && (
          <div className="relative bg-white overflow-hidden pb-4">
            <div className="max-w-7xl mx-auto">
              <div className="w-4/5 sm:w-1/2 flex flex-center m-auto">
                <Lottie
                  animationData={emptyBox}
                  loop={true}
                  style={{ width: "100%" }}
                />
              </div>
              <p className="font-medium text-xl sm:text-2xl text-gray-700 w-5/6 sm:w-4/6 m-auto text-center">
                You don't have any cards yet. Click below to get started.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center px-4">
                <div className="rounded-md shadow">
                  <Link to="/form">
                    <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 md:py-4 md:text-lg md:px-10 cursor-pointer">
                      Get started
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
