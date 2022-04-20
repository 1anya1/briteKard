import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import DisplayCard from "./components/DisplayCard";
import Form from "./components/Form";
import AllCards from "./components/AllCards";
import React, { useState } from "react";

export default function App() {
  // const [on, setOn] = useState(false);
  // const [username, setUsername] = useState("");
  const [username] = useState("Anna");
  const [id, setId] = useState("");

  return (
    <div>
      <Nav username={username} />
      <Routes>
        <Route path="/" element={""} />
        <Route
          path="form"
          element={<Form username={username} setId={setId} id={id} />}
        />
        <Route
          path={`mycard/:username/:id`}
          element={<DisplayCard username={username} id={id} />}
        />
        <Route
          path={`myCards/${username}`}
          element={<AllCards username={username} />}
        />
      </Routes>
    </div>
  );
}
