import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./main/Main";
import LoginRegister from "./main/LoginRegister";
import Battle from "./main/Battle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRegister />}>
        </Route>
        <Route path="/main" element={<Layout />}>
        </Route>
        <Route path="/battle" element={<Battle />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
