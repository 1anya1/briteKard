import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import DisplayCard from "./components/Display Card/DisplayCard";
import Form from "./components/Form/Form";
import AllCards from "./components/Display All Card/AllCards";
import React, { useState, useEffect } from "react";
import UpdateForm from "./components/Form/UpdateForm";
import Home from "./components/Home";
import axios from "axios";
import Footer from "./components/Footer/Footer";
import LogIn from "./components/LogIn";
import SignUp from "./components/SingUp";

export default function App() {
  const [username, setUsername] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const location = useLocation();
  const backend = process.env.REACT_APP_ENV==='staging'? 'http://localhost:49152' : "https://britekard.herokuapp.com"



  useEffect(() => {
    if (localStorage.token) {
      axios
        .get(
          `${backend}/user/verify/${localStorage.token}`
        )
        .then((response) => {
          setLoggedIn(true);
          setUsername(response.data.username);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setLoggedIn(false);
    }
  }, [username]);

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    setLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <div>
        {!location.pathname.includes("share") && (
          <Nav username={username} handleLogOut={handleLogOut} />
        )}
        <Routes>
          <Route
            path="/"
            element={<Home setUsername={setUsername} loggedIn={loggedIn} />}
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
            path={`mycard/preview/:id`}
            element={<DisplayCard username={username} id={id} />}
          />
          <Route
            path={`/share/:username/:id`}
            element={<DisplayCard username={username} id={id} />}
          />

          <Route path={`myCards`} element={<AllCards username={username} />} />
          <Route
            path={`mycard/update/:id`}
            element={<UpdateForm username={username} id={id} />}
          ></Route>
        </Routes>
      </div>
      {!location.pathname.includes("share") && <Footer />}
    </div>
  );
}
