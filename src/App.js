import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import DisplayCard from "./components/Display Card/DisplayCard";
import Form from "./components/Form/Form";
import AllCards from "./components/Display All Card/AllCards";
import React, { useState } from "react";
import UpdateForm from "./components/Form/UpdateForm";
import Home from "./components/Home";

export default function App() {
  // const [on, setOn] = useState(false);
  // const [username, setUsername] = useState("");
  const [username] = useState("Anna");
  const [id, setId] = useState("");

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
