import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteProfileModal from "./DeleteProfileModal";
import axios from "axios";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineExport,
  AiOutlineDelete,
} from "react-icons/ai";
export default function Profile(props) {
  const { username, height } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  }, [navigate]);

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState({
    previous: null,
    new: null,
    available: null,
  });
  const [email, setEmail] = useState({
    previous: null,
    new: null,
    available: null,
  });

  useEffect(() => {
    if (username) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/user/${username}`)
        .then((res) => {
          console.log(res.data);
          setUserData(res.data);
          setUser((prevState) => ({
            ...prevState,
            previous: res.data.username,
          }));
          setEmail((prevState) => ({ ...prevState, previous: res.data.email }));
        });
    }
  }, [username]);

  const onChangeUsername = (e) => {
    e.preventDefault();
    setUser((prevState) => ({ ...prevState, new: e.target.value }));
  };
  const onChangeEmail = (e) => {
    e.preventDefault();
    setEmail((prevState) => ({ ...prevState, new: e.target.value }));
  };
  useEffect(() => {
    if (user.new) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/user/check/${user.new}`)
        .then((response) => {
          if (response.data) {
            setUser((prevState) => ({ ...prevState, available: true }));
          } else {
            if (user.previous !== user.new) {
              setUser((prevState) => ({ ...prevState, available: false }));
            } else {
              setUser((prevState) => ({ ...prevState, available: null }));
            }
          }
        });
    } else {
      setUser((prevState) => ({ ...prevState, available: null }));
    }
  }, [user.new, user.previous]);
  useEffect(() => {
    if (email.new) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/user/check-email/${email.new}`
        )
        .then((response) => {
          if (response.data) {
            setEmail((prevState) => ({ ...prevState, available: true }));
          } else {
            if (email.previous !== email.new) {
              setEmail((prevState) => ({ ...prevState, available: false }));
            } else {
              setEmail((prevState) => ({ ...prevState, available: null }));
            }
          }
        });
    } else {
      setEmail((prevState) => ({ ...prevState, available: null }));
    }
  }, [email.new, email.previous]);
  const onCancel = () => {
    setEmail((prevState) => ({ ...prevState, new: null, available: null }));
    setUser((prevState) => ({ ...prevState, new: null, available: null }));
  };

  const onUpdate = () => {
    const data = {};
    if (user.available) {
      data["username"] = user.new;
    }
    if (email.available) {
      data["email"] = email.new;
    }
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/updates/${username}`, {
        username: data.username,
        email: data.email,
      })
      .then((response) => {
        console.log('in here')
        props.setUsername(user.new);
      })
      .catch((error) => {
        console.log("error");
      });
  };
  return (
    <div
      className=" max-w-[1800px] px-[5%] pb-6  flex flex-col"
      style={{ minHeight: `${height}px` }}
    >
      <DeleteProfileModal
        open={open}
        setOpen={setOpen}
        username={username}
        height={height}
      />

      <div className="flex flex-row items-end justify-between pb-10">
        <p className="  text-2xl font-bold  text-left  tracking-tight text-gray-900  mb-0 mt-10  capitalize">
          {props.username} Profile
        </p>
      </div>
      {userData && (
        <div className="bg-white  p-6 rounded-lg gap-2 flex flex-col drop-shadow-md">
          <p className="text-xl font-semibold pb-2">Account Settings</p>
          <div className="">
            <p className="text-sm  pb-2">Username</p>
            <div className="relative">
              {user.available === false && (
                <p className="text-xs text-red pb-1">
                  This username is already taken.
                </p>
              )}
              <input
                value={user.new !== null ? user.new : user.previous}
                onChange={(e) => onChangeUsername(e)}
                className="border border-gray-100  focus:ring-gray-200  focus:ring-1 focus:outline-none  px-2 py-1 rounded-md w-full  bg-gray-50"
              />
              {user.available ? (
                <AiOutlineCheck className="text-green absolute top-2 right-4" />
              ) : user.available === false ? (
                <AiOutlineClose className="text-red absolute top-7 right-4" />
              ) : null}
            </div>
          </div>
          <div className="pt-1">
            <p className="text-sm  pb-2">Email </p>
            <div className="relative">
              {email.available === false && (
                <p className="text-xs text-red pb-1">
                  This email is already in use.
                </p>
              )}
              <input
                value={email.new !== null ? email.new : email.previous}
                onChange={(e) => onChangeEmail(e)}
                className="border border-gray-100  focus:ring-gray-200  focus:ring-1 focus:outline-none  px-2 py-1 rounded-md w-full  bg-gray-50"
              />
              {email.available ? (
                <AiOutlineCheck className="text-green absolute top-2 right-4" />
              ) : email.available === false ? (
                <AiOutlineClose className="text-red absolute top-7 right-4" />
              ) : null}
            </div>
          </div>
          <div className="pt-6 flex gap-2 sm:flex-row flex-col">
            <button
              disabled={user.available || email.available ? false : true}
              className="rounded-md bg-gray-900 px-4 py-2 text-white text-sm  border-gray-900 border  disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-max"
              onClick={onUpdate}
            >
              Update
            </button>
            <button
              className="rounded-md bg-white border-gray-900 border px-4 py-2 text-gray-900 text-sm w-full sm:w-max"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="bg-white  p-6 rounded-lg gap-2 flex flex-col drop-shadow-md mt-4">
        <p className="text-xl font-semibold ">Log Out</p>
        <p className="text-sm text-gray-500">Log our from your account.</p>
        <div className="rounded-md shadow w-full sm:w-max">
          <button
            onClick={props.handleLogOut}
            type="submit"
            className="rounded-md bg-white border-gray-900 border px-4 py-2 text-gray-900 text-sm w-full sm:w-max"
          >
            <div className="flex flex-row gap-2 justify-center items-center">
              <AiOutlineExport size={18} className="text-gray-600" />
              <p className="leading-relaxed text-sm">Log Out</p>
            </div>
          </button>
        </div>
      </div>
      <div className="bg-white  p-6 rounded-lg gap-2 flex flex-col drop-shadow-md mt-4">
        <p className="text-xl font-semibold ">Delete Account</p>
        <p className="text-sm text-gray-500">
          Once the account is deleted it can not be reinstated. All of the data
          will be permanently removed.
        </p>
        <div className="rounded-md shadow w-full sm:w-[250px]">
          <button
            onClick={() => setOpen(true)}
            type="submit"
            className="rounded-md bg-white border-red border px-4 py-2 text-red text-sm w-full sm:w-max"
          >
            <div className="flex flex-row gap-2 justify-center items-center">
              <AiOutlineDelete size={18} className="text-red" />
              <p className="leading-relaxed text-sm">Delete Account</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
