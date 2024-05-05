// Import packages
import { useState, useEffect, createContext } from "react";
import axios from "axios";
// Import api url from config.js
import { api_url } from "../config";
// Import custom components
import Navbar from "./Navbar";
import Scene from "./Scene";
import Backpack from "./Backpack";
import Battle from "./Battle";
import Trade from "./Trade";
import Dialogue from "./Dialogue";

// Create contexts for states, current scene, previous scene, and character data
// These contexts will be used to pass and alter data between components
export const StateContext = createContext(null);
export const CurrSceneContext = createContext(null);
export const PrevSceneContext = createContext(null);
export const CharacterContext = createContext(null);

const Layout = () => {
  // Conditionally rendering components based on states
  // states: default, battle, trade, dialogue
  const [state, setState] = useState("default");
  const [prevSceneId, setPrevSceneId] = useState(1); // Previous scene ID
  const [currSceneId, setCurrSceneId] = useState(1); // Current scene ID
  const [character, setCharacter] = useState(null); // Character data

  // Fetch character data on initial render
  useEffect(() => {
    axios.get(`${api_url}/character/1`).then((response) => {
      setCharacter(response.data.data);
    });
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