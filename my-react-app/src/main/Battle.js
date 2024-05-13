// Import packages
import { useState, useEffect } from "react";
import axios from "axios";

// Import custom components
import BattleInterface from "../components/Battle/BattleInterface";
import Monster from "../components/Battle/Monster";
import BattleResult from "../components/Battle/BattleResult";

const Battle = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [battleStatus, setBattleStatus] = useState('continue');
  const [monster, setMonster] = useState(null);
  const [skills, setSkills] = useState([]);
  const [battle, setBattle] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios.post(`/battle/create`, { characterId: user.character.id })
      .then((response) => {
        const { monster, skills, battle } = response.data.data;
        setMonster(monster);
        setSkills(skills);
        setBattle(battle);
        setIsLoading(false);
      }).catch((error) => {
        console.error(error);
      });
  }, []);

  if (isLoading) return null;

  return (
    <>
      {/* Navbar */}
      <header className="sticky-top bg-white">
        <div className="container p-3">
          <div className="row">
            <h1 className="display-5 fw-bold" style={{ "fontFamily": "'Brush Script MT', cursive" }}>MyRPG</h1>
          </div>
        </div>
      </header>

      {/* Main Display Area */}
      <section className="bg-light">
        <div className="container px-4 py-2">
          {battleStatus === 'continue' 
            ? <Monster monster={monster} battle={battle}/>
            : <BattleResult battleStatus={battleStatus} result={result}/>
          }
        </div>
      </section>

      {/* Sub Display Area */}
      <section>
        <div className="container px-4 py-2 show-slow">
          <BattleInterface battle={battle} monster={monster} skills={skills} battleStatus={battleStatus} setBattleStatus={setBattleStatus} setBattle={setBattle} setResult={setResult} />
        </div>
      </section>
    </>
  );
};

export default Battle;