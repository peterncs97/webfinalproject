import { useState, createContext } from "react";
import Navbar from "./Navbar";
import Scene from "./Scene";
import Backpack from "./Backpack";
import Battle from "./Battle";
import Trade from "./Trade";
import Dialogue from "./Dialogue";

export const StateContext = createContext(null);
export const CurrSceneContext = createContext(null);
export const PrevSceneContext = createContext(null);

const Layout = () => {
  const [state, setState] = useState("default");
  const [prevSceneId, setPrevSceneId] = useState(1);
  const [currSceneId, setCurrSceneId] = useState(1);

  return (
    <StateContext.Provider value={{ state, setState }}>
      <PrevSceneContext.Provider value={{ prevSceneId, setPrevSceneId }}>
        <CurrSceneContext.Provider value={{ currSceneId, setCurrSceneId }}>
          <header className="sticky-top bg-white">
            <div className="container p-3">
              <Navbar />
            </div>
          </header>

          <section className="bg-light">
            <div className="container px-4 py-2">
              <Scene />
            </div>
          </section>

          <section>
            <div className="container px-4 py-2 show-slow">
              {
                state === 'default' ?
                  <Backpack />
                  : state === 'battle' ?
                    <Battle />
                    : state === 'trade' ?
                      <Trade />
                      : state === 'dialogue' ?
                        <Dialogue /> : null
              }
            </div>
          </section>
        </CurrSceneContext.Provider>
      </PrevSceneContext.Provider>
    </StateContext.Provider>
  )
};

export default Layout;