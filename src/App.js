import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Swap from "./pages/Swap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Swap" element={<Swap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
