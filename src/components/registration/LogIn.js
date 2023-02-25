import axios from "axios";
import { useState } from "react";
import FormInput from "../Form/Input Styles/FormInput";
import { Link, useNavigate } from "react-router-dom";
const data = [
  {
    label: "Email",
    type: "text",
    id: "email",
    placeholder: "example@gmail.com",
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
];
export default function LogIn(props) {
  const [userInputs, setUserInputs] = useState({
    email: null,
    password: null,
    error: false,
    errorMessage:''
  });
  const navigate = useNavigate();
  function handleChange(event) {
    const userObj = { ...userInputs };
    console.log(userObj);
    let value = event.target.value;
    let objKey = event.target.getAttribute("id");
    userObj[objKey] = value;
    userObj.error=false
    setUserInputs(userObj);

  }
  console.log(process.env.REACT_APP_BACKEND_URL);
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
        email: userInputs.email,
        password: userInputs.password,
      })
      .then((response) => {
        localStorage.token = response.data.token;
        if (response.data.token) {
          props.setUsername(userInputs.username);
          navigate(`/dashboard`);
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
        setUserInputs((prevState) => ({
          ...prevState,
          error: true,
          errorMessage: error.response.data
        }));
      });
  }

  return (
    <div className="px-4 pt-14 flex-1">
      <div className="w-full max-w-2xl md:mx-auto md:px-10 py-10 px-4  bg-gray-50 rounded-xl mb-10 ">
        <p className="text-2xl font-extrabold  text-left  tracking-tight text-gray-900  mb-5 ">
          Log In
        </p>
        {userInputs.error &&
         <p className="text-md   text-left  tracking-tight text-red  mb-5 ">
         {userInputs.errorMessage}
       </p>
        }
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
                hidden={el.hidden}
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
          <p className="pt-4">
            <Link to="/forgot-password">
              <p className="cursor-pointer text-purple-400">Forgot Password</p>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
