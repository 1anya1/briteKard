import axios from "axios";
import { useState } from "react";
import FormInput from "./Form/Input Styles/FormInput";
const data = [
  {
    label: "Username",
    type: "text",
    id: "username",
    placeholder: "username",
    value: "",
  },
  {
    label: "Password",
    type: "text",
    id: "password",
    placeholder: "password",
    value: "",
  },
];
export default function LogIn() {
  const [userInputs, setUserInputs] = useState([
    { username: null },
    { password: null },
    { error: false },
  ]);
  function handleChange(event) {
    const userObj = { ...userInputs };
    let value = event.target.value;
    let objKey = event.target.getAttribute("id");
    userObj[objKey] = value;
    setUserInputs(userObj);
  }
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("https://britekard.herokuapp.com/user/login", {
        username: userInputs.username,
        password: userInputs.password,
      })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <>
      <h1>LogIn</h1>
      <form onSubmit={handleSubmit}>
        {data.map((el, idx) => {
          console.log(userInputs[el.id]);
          return (
            <FormInput
              key={idx}
              label={el.label}
              type={el.type}
              id={el.id}
              placeholder={el.placeholder}
              value={userInputs[el.id] || ""}
              change={handleChange}
              required={"required"}
            />
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
