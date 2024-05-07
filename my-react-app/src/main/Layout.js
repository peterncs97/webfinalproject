// Import packages
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// Import custom components
import Navbar from "./Navbar";
import Scene from "./Scene";
import Backpack from "./Backpack";
import Battle from "./Battle";
import Trade from "./Trade";
import Dialogue from "./Dialogue";
import { AuthContext } from "../App";

// Create contexts for states, current scene, previous scene, and character data
// These contexts will be used to pass and alter data between components
export const StateContext = createContext(null);
export const CurrSceneContext = createContext(null);
export const PrevSceneContext = createContext(null);
export const CharacterContext = createContext(null);

const Layout = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  // Conditionally rendering components based on states
  // states: default, battle, trade, dialogue
  const [state, setState] = useState("default");
  const [prevSceneId, setPrevSceneId] = useState(1); // Previous scene ID
  const [currSceneId, setCurrSceneId] = useState(1); // Current scene ID
  const [character, setCharacter] = useState(null); // Character data

  // Persist user data on refresh and fetch character data on initial render
  useEffect(() => {
    // const token = localStorage.getItem("Authorization");
    // if (token) {
    //   setIsAuthenticated(true);
    //   const user = JSON.parse(localStorage.getItem("user"));
    //   setUser(user);
    // axios.get(`/character/${user.character.id}`)
      axios.get(`/character/1`)
        .then((response) => {
          setCharacter(response.data.data);
        }).catch((error) => {
          console.error('Error fetching character data: ', error);
        });
    // }
  }, []);

 

  return (
    <StateContext.Provider value={{ state, setState }}>
      <PrevSceneContext.Provider value={{ prevSceneId, setPrevSceneId }}>
        <CurrSceneContext.Provider value={{ currSceneId, setCurrSceneId }}>
          <CharacterContext.Provider value={{ character, setCharacter }}>
            {/* Navbar */}
            <header className="sticky-top bg-white">
              <div className="container p-3">
                <Navbar character={character}/>
              </div>
            </header>
              
            {/* Main Display Area, for Scene */}
            <section className="bg-light">
              <div className="container px-4 py-2">
                <Scene />
              </div>
            </section>

            {/* Sub Display Area, for Backpack, Battle, Trade or Dialogue*/}
            <section>
              <div className="container px-4 py-2 show-slow">
                {state === "default" ? (
                  <Backpack character={character}/>
                ) : state === "battle" ? (
                  <Battle />
                ) : state === "trade" ? (
                  <Trade />
                ) : state === "dialogue" ? (
                  <Dialogue />
                ) : null}
              </div>
            </section>
          </CharacterContext.Provider>
        </CurrSceneContext.Provider>
      </PrevSceneContext.Provider>
    </StateContext.Provider>
  );
};

export default Layout;