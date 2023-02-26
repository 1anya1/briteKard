import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FormInput from "../Form/Input Styles/FormInput";
export default function CreateNewPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const data = [
    {
      type: "text",
      id: "password",
      placeholder: "Password",
      value: "",
    },
  ];
  function handleChange(event) {
    let value = event.target.value;
    setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/passwordReset/reset`, {
        token,
        password,
      })
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
    <div className="px-4 pt-14 flex-1">
      <div className="w-full max-w-2xl md:mx-auto md:px-10 py-10 px-4  bg-gray-50 rounded-xl mb-10 ">
        <p className="text-2xl font-extrabold  text-left  tracking-tight text-gray-900  mb-5 ">
          Password Reset
        </p>
        {!loaded && (
          <>
            <p className="text-lg  text-left  tracking-tight text-gray-900  mb-5 ">
              Choose new passsword
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
                    value={password || ""}
                    change={handleChange}
                    required={"required"}
                    hidden={true}
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
            </form>
          </>
        )}
        {loaded && (
          <>
            <p className="text-md   text-left  tracking-tight text-gray-900  mb-5 ">
              Password has been successfully updated
            </p>
            <Link to="/login">
              <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-400 hover:bg-purple-300 md:py-4 md:text-lg md:px-10 cursor-pointer">
                Log In
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
