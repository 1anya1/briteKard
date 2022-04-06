import "./App.css";
import { createRoot } from "react-dom/client";
import {
  PhoneOutgoingIcon,
  MailIcon,
  GlobeAltIcon,
} from "@heroicons/react/solid";

export default function App() {
  return (
    <div className="2xl:container 2xl:mx-auto">
      <VCard />
    </div>
  );
}
function VCard() {
  return (
    <div className="md:container md:mx-auto">
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        <PhoneOutgoingIcon
          className="fill-black hover:fill-yellow "
          xmlns="http://www.w3.org/2000/svg"
        />
        <MailIcon
          className="fill-black hover:fill-yellow "
          xmlns="http://www.w3.org/2000/svg"
        />
        <GlobeAltIcon
          className="fill-black hover:fill-yellow "
          xmlns="http://www.w3.org/2000/svg"
        />
      </div>
    </div>
  );
}

const container = document.createElement("div");
const root = createRoot(container);
root.render(<App tab="home" />);
