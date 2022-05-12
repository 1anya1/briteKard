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
  return <p>Hello</p>;
}
