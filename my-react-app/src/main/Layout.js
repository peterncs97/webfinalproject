import { useState } from "react";
import Navbar from "./Navbar";
import CharacterModal from "../components/CharacterModal";
import Scene from "./Scene";
import Backpack from "./Backpack";
import BattleLog from "./BattleLog";
import Trade from "./Trade";

const Layout = () => {
  const [currSceneId, setCurrSceneId] = useState(1);
  const [prevSceneId, setPrevSceneId] = useState(1);
  const [isBattle, setIsBattle] = useState(false);
  const [isTrade, setIsTrade] = useState(false);

  const SubArea = () => {
    if (isTrade)
      return <Trade setIsTrade={setIsTrade} />;
    else if (isBattle)
      return <BattleLog prevSceneId={prevSceneId} setCurrSceneId={setCurrSceneId} />;
    else
      return <Backpack />;
  }

  return (
    <>
      <header className="sticky-top bg-white">
        <div className="container p-3">
          <Navbar />
        </div>
        <CharacterModal />
      </header>

      <section className="bg-light">
        <div className="container px-4 py-2">
          <Scene currSceneId={currSceneId}
            prevSceneId={prevSceneId}
            setCurrSceneId={setCurrSceneId}
            setPrevSceneId={setPrevSceneId}
            setIsBattle={setIsBattle}
            setIsTrade={setIsTrade}
          />
        </div>
      </section>

      <section>
        <div className="container px-4 py-2">
          <SubArea />
        </div>
      </section>
    </>
  )
};

export default Layout;