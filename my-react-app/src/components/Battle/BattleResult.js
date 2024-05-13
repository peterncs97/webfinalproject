import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BattleResult = ({ battleStatus, result }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'z'){
        event.preventDefault();
        window.location.reload();
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  const attrAdj = battleStatus === 'win' ? result.attrAdjustment : null;
  const title = battleStatus === 'win' ? '勝利' : '失敗';
  const imgSrc = battleStatus === 'win' ? '/images/treasure.svg' : '/images/skull.svg';
  const imgAlt = battleStatus === 'win' ? 'victory' : 'defeat';
  const imgCredit = battleStatus === 'win' ? 'Designed by b0red / pixabay' : 'Image by Rochak Shukla on Freepik';
  const message = battleStatus === 'win' ? `獲得${(result.item) ? result.item + '，' : '' }${result.money}金幣，${result.experience}經驗值！` : '失去一半金錢。。。';
  const lvlupMessage = (battleStatus === 'win' && result.isLevelUp) ? 
    `等級提升！ HP+${attrAdj[0]}，MP+${attrAdj[1]}，PWR+${attrAdj[2]}，AGI+${attrAdj[3]}，LCK+${attrAdj[4]}，ATK+${attrAdj[5]}，DEF+${attrAdj[6]}` 
    : '';

  return (
    <div className="show-fadein">
      <div className='row justify-content-center py-2 border border-3 bg-light'>
        {/* Result */}
        <div className='row p-2'>
          <h3 className='text-center'>{title}</h3>
        </div>
        {/* Image and Image Credit*/}
        <div className='row justify-content-center'>
          <img className="img-fluid home-img fade-in" src={imgSrc} alt={imgAlt} />
          <figcaption className="figure-caption text-center"><small>{imgCredit}</small></figcaption>
        </div>
        <div className='row pt-4'>
          <p className='lead text-center'><em>{message}<br />{lvlupMessage}</em></p>
        </div>
        <div>
          <ul className="list-group list-group-horizontal justify-content-center">
            {(battleStatus === 'win') && 
              <button type="button" className="list-group-item" onClick={() => { window.location.reload() }} >
                繼續索敵 <span className="badge bg-dark">Z</span>
              </button>
            }
            <button type="button" className="list-group-item" onClick={() => navigate("/main")} >
              返回
            </button>
          </ul>
        </div>
      </div>
    
    </div>
  )
};
export default BattleResult;