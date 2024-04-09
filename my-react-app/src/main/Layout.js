import { useState } from "react";
import Navbar from "./Navbar";
import CharacterModal from "../components/CharacterModal";
import Scene from "./Scene";
import SwapArea from "./SwapArea";
import BattleLog from "./BattleLog";

const Layout = () => {
  const [currentSceneId, setCurrentSceneId] = useState(0);
  const [isBattle, setIsBattle] = useState(false);

  return (
    <>
      <header className="sticky-top bg-white">
        <div className="container p-2">
          <div className='row justify-content-center' >
            <div className='col-10'>
              <Navbar />
            </div>
          </div>
        </div>
      </header>

      <section className="bg-light">
        <div className="container px-4 py-2">
          <div className='row justify-content-center'>
            <div className='col-10 border border-3 py-2'>
              <Scene currentSceneId={currentSceneId} 
                setCurrentSceneId={setCurrentSceneId} 
                setIsBattle={setIsBattle} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container px-4 py-2">
          <div className='row justify-content-center'>
            <div className='col-10 border border-3'>
              {isBattle ? 
                (
                  <BattleLog setCurrentSceneId={setCurrentSceneId} />
                )
                : 
                (<SwapArea />)
              }
            </div>
          </div>
        </div>
      </section>

      <CharacterModal />
    </>
  )
};

export default Layout;