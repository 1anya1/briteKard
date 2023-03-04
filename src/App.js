import "./App.css";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
import Nav from "./components/Nav/Nav";
import DisplayCard from "./components/Display Card/DisplayCard";
import Form from "./components/Form/Form";
import AllCards from "./components/Display All Card/AllCards";
import React, { useState, useEffect } from "react";
import UpdateForm from "./components/Form/UpdateForm";
import Home from "./components/Home";
import axios from "axios";
import LogIn from "./components/registration/LogIn";
import SignUp from "./components/registration/SingUp";
import PasswordReset from "./components/registration/PasswordReset";
import CreateNewPassword from "./components/registration/CreateNewPassword";
import Footer from "./components/Footer/Footer";
import Analytics from "./components/Analytics/Analytics";
import Profile from "./components/Profile/Profile";

import {
  AiOutlineUser,
  AiOutlineIdcard,
  AiOutlineStock,
  AiOutlinePlusCircle,
} from "react-icons/ai";

export default function App() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const location = useLocation();
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    if (localStorage.token) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/user/verify/${localStorage.token}`
        )
        .then((response) => {
          console.log(response);
          setLoggedIn(true);
          setUsername(response.data.username);
        })
        .catch((error) => {
          setLoggedIn(false);
          localStorage.removeItem("token");
        });
    } else {
      setLoggedIn(false);
    }
  }, [username]);
  const updateDimensions = () => {
    console.log("here");
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const routerSystem = () => {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setUsername={setUsername}
              loggedIn={loggedIn}
              username={username}
              handleLogOut={handleLogOut}
            />
          }
        />
        <Route
          path="/login"
          element={<LogIn setUsername={setUsername} loggedIn={loggedIn} />}
        />
        <Route
          path="/signup"
          element={<SignUp setUsername={setUsername} loggedIn={loggedIn} />}
        />

        <Route
          path="/form"
          element={<Form username={username} setId={setId} id={id} />}
        />
        <Route
          path="/forgot-password"
          element={<PasswordReset username={username} setId={setId} id={id} />}
        />

        <Route
          path={`mycard/preview/:username/:id`}
          element={<DisplayCard />}
        />
        <Route path={`/reset/:token`} element={<CreateNewPassword />} />
        <Route path={`/share/:username/:id`} element={<DisplayCard />} />

        <Route path={`/dashboard`} element={<AllCards username={username} />} />
        <Route
          path={"/dashboard/analytics"}
          element={<Analytics username={username} />}
        />
        <Route
          path={"/dashboard/profile"}
          element={
            <Profile
              username={username}
              handleLogOut={handleLogOut}
              height={height}
              setUsername={setUsername}
            />
          }
        />
        <Route
          path={`mycard/update/:id`}
          element={<UpdateForm username={username} id={id} />}
        ></Route>
      </Routes>
    );
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    setLoggedIn(false);
    setUsername("");
    navigate("/");
  };
  const links = [
    {
      name: "My Cards",
      link: "/dashboard",
      Icon: AiOutlineIdcard,
      active: true,
    },
    {
      name: "New Card",
      link: "/form",
      Icon: AiOutlinePlusCircle,
      active: false,
    },
    {
      name: "Analytics",
      link: "/dashboard/analytics",
      Icon: AiOutlineStock,
      active: false,
    },
    {
      name: "Profile",
      link: "/dashboard/profile",
      Icon: AiOutlineUser,
      active: false,
    },
  ];
  return (
    <div className={`bg-white  `} style={{ minHeight: `${height}px` }}>
      {location.pathname.includes("dashboard") ||
      location.pathname.includes("mycard") ||
      location.pathname.includes("form") ? (
        <div
          className={`flex sm:flex-row-reverse flex-col  bg-gray-50`}
          style={{
            minHeight: `${height}px`,
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <div className="flex-1  overflow-scroll  scroll-fix">
            {routerSystem()}
          </div>
          <div className=" fixed sm:h-[100vh] sm:top-0 left-0 z-10 bg-white w-screen sm:w-[100px] sm:min-w-[100px] lg:w-[300px] lg:min-w-[300px] flex flex-row sm:flex-col space-x-1 space-y-1  bottom-0 shadow-[1px_1px_6px_-3px__rgba(23,23,23,1)] sm:shadow-[1px_1px_6px_-5px__rgba(23,23,23,1)]  pt-4 sm:pt-10 justify-around sm:justify-start h-[80px]">
            {links.map((link) => (
              <Link to={link.link}>
                <div
                  className={`flex flex-row space-x-2 sm:w-4/5 m-auto sm:py-4 sm:px-4 p-3  rounded-lg md:rounded-2xl  sm:h-max justify-center lg:justify-start hover:bg-purple-50 ${
                    location.pathname.includes(link.link) &&
                    location.pathname.length === link.link.length
                      ? "bg-gray-50 "
                      : ""
                  }`}
                >
                  <link.Icon size={24} className="text-gray-600" />
                  <p className="text-l text-gray-900 font-medium hidden lg:block">
                    {link.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white min-h-screen flex flex-col justify-between">
          {!location.pathname.includes("share") && (
            <Nav username={username} handleLogOut={handleLogOut} />
          )}

          {routerSystem()}
          {!location.pathname.includes("share") && <Footer />}
        </div>
      )}
    </div>
  );
}
