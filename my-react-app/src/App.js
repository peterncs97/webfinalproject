import { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./main/Layout";
import LoginRegister from "./main/LoginRegister";

export const AuthContext = createContext(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<LoginRegister />}>
          </Route>
          <Route path="/main" element={<Layout />}>
          </Route> */}
          <Route path="/" element={<Layout />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
