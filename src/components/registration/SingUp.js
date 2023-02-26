import FormInput from "../Form/Input Styles/FormInput";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
    hidden: true,
  },
  {
    label: "Email",
    type: "text",
    id: "email",
    placeholder: "email",
    value: "",
  },
];
export default function SignUp(props) {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState([
    {
      username: null,
      password: null,
      firstName: null,
      lastName: null,
      email: null,
    },
  ]);

  function handleChange(event) {
    const inputs = { ...userInput };
    const val = event.target.value;
    const objKey = event.target.getAttribute("id");
    inputs[objKey] = objKey === "email" ? val.toLowerCase() : val;
    setUserInput(inputs);
  }
  function formSubmit(e) {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, userInput)
      .then((response) => {
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
            email: userInput.email,
            password: userInput.password,
          })
          .then((response) => {
            localStorage.token = response.data.token;
            if (response.data.token) {
              props.setUsername(userInput.username);
              navigate(`/dashboard`);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }
  return (
    <div className="px-4 pt-14 flex-1">
      <div className="w-full max-w-2xl md:mx-auto md:px-10 py-10 px-4  bg-gray-50 rounded-xl mb-10 ">
        <p className="text-2xl font-extrabold  text-left  tracking-tight text-gray-900  mb-5 ">
          Sign Up
        </p>
        <form onSubmit={formSubmit}>
          {data.map((el, idx) => {
            return (
              <FormInput
                key={idx}
                label={el.label}
                type={el.type}
                id={el.id}
                placeholder={el.placeholder}
                value={userInput[el.id] || ""}
                change={handleChange}
                required={"required"}
                hidden={el.hidden}
              />
            );
          })}

          <div className="rounded-md shadow">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-400 hover:bg-purple-300 md:py-4 md:text-lg md:px-10 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
          <p className="pt-4">
            Have an existing account?{' '}
            <Link to="/login">
              <span className="cursor-pointer text-purple-400">
                Log in here
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
