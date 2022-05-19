import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import DisplayCard from "./components/Display Card/DisplayCard";
import Form from "./components/Form/Form";
import AllCards from "./components/Display All Card/AllCards";
import React, { useState, useEffect } from "react";
import UpdateForm from "./components/Form/UpdateForm";
import Home from "./components/Home";

import axios from "axios";

export default function App() {
  // const [on, setOn] = useState(false);
  const [username, setUsername] = useState("");

  // const [username] = useState("Anna");
  const [loggedIn, setLoggedIn] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    console.log(localStorage.token);
    if (localStorage.token) {
      axios
        .get(
          "https://britekard.herokuapp.com/user/verify/" + localStorage.token
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
  console.log(username);
  // const handleLogOut = (e) => {
  //   e.preventDefault();
  //   localStorage.clear();
  //   setLoggedIn(false);
  //   setUsername("");
  // };

  return (
    <div className="bg-gray-200 min-h-screen">
      <Nav username={username} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="form"
          element={<Form username={username} setId={setId} id={id} />}
        />
        <Route
          path={`mycard/:username/:id`}
          element={<DisplayCard username={username} id={id} />}
        />
        <Route
          path={`myCards/:username`}
          element={<AllCards username={username} />}
        />
        <Route
          path={`mycard/update/:username/:id`}
          element={<UpdateForm username={username} id={id} />}
        ></Route>
      </Routes>
    </div>
  );
}
