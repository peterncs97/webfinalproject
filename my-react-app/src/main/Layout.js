import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { api_url } from "../config";

import Navbar from "./Navbar";
import Scene from "./Scene";
import Backpack from "./Backpack";
import Battle from "./Battle";
import Trade from "./Trade";
import Dialogue from "./Dialogue";

export const StateContext = createContext(null);
export const CurrSceneContext = createContext(null);
export const PrevSceneContext = createContext(null);
export const CharacterContext = createContext(null);

const Layout = () => {
  const [state, setState] = useState("default");
  const [prevSceneId, setPrevSceneId] = useState(1);
  const [currSceneId, setCurrSceneId] = useState(1);
  const [character, setCharacter] = useState(null);

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
            <header className="sticky-top bg-white">
              <div className="container p-3">
                <Navbar character={character}/>
              </div>
            </header>

            <section className="bg-light">
              <div className="container px-4 py-2">
                <Scene />
              </div>
            </section>

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