import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import DisplayCard from "./components/DisplayCard";
import Form from "./components/Form";

export default function App() {
  // const [on, setOn] = useState(false);

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={""} />
        <Route path="form" element={<Form />} />
        <Route path="mycard" element={<DisplayCard />} />
      </Routes>
    </div>
  );
}
