import { Route, Routes } from "react-router-dom";
import AddBoard from "./Pages/AddBoard";
import Boards from "./Pages/Boards";
import BoardSelect from "./Pages/BoardSelect";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Boards/>}></Route>
      <Route path="/createboard" element={<AddBoard/>}></Route>
      <Route path="/selectboard" element={<BoardSelect/>}></Route>
    </Routes>
  );
}

export default App;

