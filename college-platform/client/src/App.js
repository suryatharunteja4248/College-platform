import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CollegeDetail from "./CollegeDetail";
import Compare from "./Compare";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/college/:id" element={<CollegeDetail />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;