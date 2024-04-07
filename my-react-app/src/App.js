import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Scene from "./pages/Scene";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Scene />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
