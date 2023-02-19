import axios from "axios";
import { useState } from "react";
import FormInput from "./Form/Input Styles/FormInput";
import { Link, useNavigate } from "react-router-dom";
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
export default function LogIn(props) {
  const [userInputs, setUserInputs] = useState([
    { username: null },
    { password: null },
    { error: false },
  ]);
  const navigate = useNavigate();
  const backend = process.env.REACT_APP_ENV==='staging'? 'http://localhost:49152' : "https://britekard.herokuapp.com"
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
      .post(`${backend}/user/login`, {
        username: userInputs.username,
        password: userInputs.password,
      })
      .then((response) => {
        localStorage.token = response.data.token;
        if (response.data.token) {
          props.setUsername(userInputs.username);
          navigate(`/myCards`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="px-4 pt-14">
      <div className="w-full max-w-2xl md:mx-auto md:px-10 py-10 px-4  bg-gray-50 rounded-xl mb-10 ">
        <p className="text-2xl font-extrabold  text-left  tracking-tight text-gray-900  mb-5 ">
          Log In
        </p>
        <form onSubmit={handleSubmit}>
          {data.map((el, idx) => {
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
          <div className="mt-4 sm:flex sm:justify-center  w-full ">
            <div className="rounded-md shadow">
              <button
                type="submit"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-400 hover:bg-purple-300 md:py-4 md:text-lg md:px-10 cursor-pointer"
              >
                Log In
              </button>
            </div>
          </div>
          <p className="pt-4">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="cursor-pointer text-purple-400">
                Sign up here
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
