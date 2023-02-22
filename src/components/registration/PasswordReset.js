import axios from "axios";
import { useState } from "react";
import FormInput from "../Form/Input Styles/FormInput";
import { Link } from "react-router-dom";
const data = [
  {
    type: "text",
    id: "email",
    placeholder: "example@gmail.com",
    value: "",
  },
];
export default function PasswordReset(props) {
  const [email, setEmail] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  

  function handleChange(event) {
    let value = event.target.value;
    setError(false)
    setEmail(value);
  }
 
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    console.log(email);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/passwordReset/reset-password`, { email })
      .then((response) => {
        if (response) {
          setLoaded(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.response.data);
        setError(true);
      });
  }

  return (
    <div className="px-4 pt-14">
      <div className="w-full max-w-2xl md:mx-auto md:px-10 py-10 px-4  bg-gray-50 rounded-xl mb-10 ">
        <p className="text-2xl font-extrabold  text-left  tracking-tight text-gray-900  mb-5 ">
          Password reset
        </p>
        {!loaded && (
          <>
            <p className="text-lg  text-left  tracking-tight text-gray-900  mb-5 ">
              Please enter your email below to reset password
            </p>
            {error && (
              <p className="text-lg  text-left  tracking-tight text-red  mb-5 ">
                {errorMessage}
              </p>
            )}
            <form onSubmit={handleSubmit}>
              {data.map((el, idx) => {
                return (
                  <FormInput
                    key={idx}
                    label={el.label}
                    type={el.type}
                    id={el.id}
                    placeholder={el.placeholder}
                    value={email || ""}
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
                    Reset Password
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
          </>
        )}
        {loaded && (
          <>
            <p className="text-md   text-left  tracking-tight text-gray-900  mb-5 ">
              Email has been successfully sent. Please check your inbox.
            </p>
            <Link to="/">
              <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-400 hover:bg-purple-300 md:py-4 md:text-lg md:px-10 cursor-pointer">
                Back to Homepage
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
