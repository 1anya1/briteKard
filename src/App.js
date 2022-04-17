import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import DisplayCard from "./components/DisplayCard";
import Form from "./components/Form";

export default function App() {
  // const [on, setOn] = useState(false);

  return (
    <div className="2xl:container 2xl:mx-auto">
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="form" element={<Form />} />
        <Route path="mycard" element={<DisplayCard />} />
      </Routes>
    </div>
  );
}
