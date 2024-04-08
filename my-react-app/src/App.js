import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./main/Layout";
import BattleLog from "./main/BattleLog";
import SwapArea from "./main/SwapArea";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element ={<SwapArea />} />
          <Route path="battle" element={<BattleLog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
