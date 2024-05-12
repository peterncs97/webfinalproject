// Import packages
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// Import custom components
import Navbar from "./Navbar";
import Scene from "./Scene";
import Backpack from "./Backpack";
import Trade from "./Trade";
import { AuthContext } from "../App";

// Create contexts for states, current scene, previous scene, and character data
// These contexts will be used to pass and alter data between components
export const ActionContext = createContext(null);
export const CharacterContext = createContext(null);

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  // Conditionally rendering components based on states
  // states: default, battle, trade, dialogue
  const [action, setAction] = useState("default");
  const [character, setCharacter] = useState(null); // Character data

  // Persist user data on refresh and fetch character data on initial render
  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      setIsAuthenticated(true);
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
      axios.get(`/character/${user.character.id}`)
        .then((response) => {
          setCharacter(response.data.data);
          setIsLoading(false);
        }).catch((error) => {
          console.error('Error fetching character data: ', error);
        });
    }
  }, [setUser, setIsAuthenticated]);

  function SubDisplay({action, character}) {
    switch (action) {
      case "default":
        return <Backpack character={character} />;
      case "trade":
        return <Trade />;
      default:
        return null;
    };
  }

  if (isLoading) return null;

  return (
    <ActionContext.Provider value={{ action, setAction }}>
      <CharacterContext.Provider value={{ character, setCharacter }}>
        {/* Navbar */}
        <header className="sticky-top bg-white">
          <div className="container p-3">
            <Navbar character={character} />
          </div>
        </header>

        {/* Main Display Area, for Scene */}
        <section className="bg-light">
          <div className="container px-4 py-2">
            <Scene character={character} />
          </div>
        </section>

        {/* Sub Display Area, for Backpack, Battle, Trade or Dialogue*/}
        <section>
          <div className="container px-4 py-2 show-slow">
            <SubDisplay action={action} character={character} />
          </div>
        </section>
      </CharacterContext.Provider>
    </ActionContext.Provider>
  );
};

export default Layout;