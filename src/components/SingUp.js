import FormInput from "./Form/Input Styles/FormInput";
import { useState } from "react";
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
  {
    label: "First Name ",
    type: "text",
    id: "firstName",
    placeholder: "userName",
    value: "",
  },
  {
    label: "Last Name",
    type: "text",
    id: "lastName",
    placeholder: "lastName",
    value: "",
  },
  {
    label: "Email",
    type: "text",
    id: "email",
    placeholder: "email",
    value: "",
  },
];
export default function SignUp() {
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
    inputs[objKey] = val;
    setUserInput(inputs);
  }
  return (
    <>
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
          />
        );
      })}
    </>
  );
}
