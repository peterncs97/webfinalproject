import HpMpBars from "./HpMpBars.js";

const Monster = ({ monster, battle }) => {
  return (
    <div className="show-fadein">
      <div className='row justify-content-center py-2 border border-3 bg-light'>
        {/* Monster Name */}
        <div className='row p-2'>
          <h3 className='text-center'>{monster.name}</h3>
        </div>
        {/* Monster Image and Image Credit*/}
        <div className='row justify-content-center'>
          <img className="img-fluid home-img fade-in" src={monster.imagePath} alt={monster.name} />
          <figcaption className="figure-caption text-center"><small>{monster.imageDescription}</small></figcaption>
        </div>
        <div className='row mb-2'>
          <HpMpBars currhp={battle.MonsterHP} maxhp={battle.MonsterMAXHP} />
        </div>
      </div>
      
    
    </div>
  )
};
export default Monster;