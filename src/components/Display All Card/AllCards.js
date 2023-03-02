import { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";
import ShareModal from "./ShareModal";
import DeleteFormModal from "../Form/Input Styles/DeleteFormModal";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

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
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  }, [navigate]);

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
          setData(response.data);
        });
    }
  }, [username, deleteModal]);

  for (let card in data) {
    const { _id, firstName, lastName, title, photo, qrCode } = data[card];

    const name = `${firstName} ${lastName}`;

    const display = {
      id: _id,
      name: name,
      jobTitle: title,
      image: photo,
      qrCode,
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
          <div className="flex flex-row flex-wrap sm:gap-5  gap-2 ">
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
                  className="drop-shadow-md  border-gray-100 border  lg:w-[calc(50%_-_10px)] w-full sm:w-full text-small text-gray-800 font-medium mb-4 sm:mb-0 bg-white rounded-2xl  flex flex-col justify-between p-4 sm:p-6  h-max"
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
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <button
                      onClick={() =>
                        navigate(`/mycard/preview/${username}/${card.id}`)
                      }
                      className=" h-12  sm:w-[calc(50%_-_4px)] w-[calc(50%_-_2px)] border p-1  font-medium border-gray-800  rounded-md bg-white  hover:bg-gray-100  text-gray-800 text-lg"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => handleModal(card)}
                      className=" h-12 sm:w-[calc(50%_-_4px)] w-[calc(50%_-_2px)] border p-1  font-medium border-gray-800  rounded-md bg-white  hover:bg-gray-100  text-gray-800 text-base"
                    >
                      Share
                    </button>

                    <button
                      onClick={() => navigate(`/mycard/update/${card.id}`)}
                      className="h-12  sm:w-[calc(50%_-_4px)] w-[calc(50%_-_2px)] border p-1  font-medium border-gray-800  rounded-md bg-white  hover:bg-gray-100  text-gray-800 text-base"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteCard(card)}
                      className=" h-12 sm:w-[calc(50%_-_4px)] w-[calc(50%_-_2px)] border p-1  font-medium border-gray-800  rounded-md bg-white  hover:bg-gray-100  text-gray-800 text-base"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="h-[200px] drop-shadow-md  border-gray-100 border  lg:w-[calc(50%_-_10px)] w-full sm:w-full text-small text-gray-800 font-medium mb-4 sm:mb-0 bg-white rounded-2xl  flex flex-col  p-4 sm:p-6 justify-center items-center">
              <Link to="/form">
                <div className="gap-4 flex flex-col cursor-pointer group">
                  <div className="rounded-full bg-gray-50 w-max p-4 m-auto group-hover:bg-gray-200 ">
                    <AiOutlinePlus size={30} className="color-gray-900" />
                  </div>
                  <p className="text-lg font-bold">Create New Card</p>
                </div>
              </Link>
            </div>
          </div>
        )}
        {!data && username && <LoadingScreen />}
        {displayCard.length < 1 && data && (
          <div className="h-[200px] drop-shadow-md  border-gray-100 border  lg:w-[calc(50%_-_10px)] w-full sm:w-full text-small text-gray-800 font-medium mb-4 sm:mb-0 bg-white rounded-2xl  flex flex-col  p-4 sm:p-6 justify-center items-center">
            <Link to="/form">
              <div className="gap-4 flex flex-col cursor-pointer group">
                <div className="rounded-full bg-gray-50 w-max p-4 m-auto group-hover:bg-gray-200 ">
                  <AiOutlinePlus size={30} className="color-gray-900" />
                </div>
                <p className="text-lg font-bold">Create New Card</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
