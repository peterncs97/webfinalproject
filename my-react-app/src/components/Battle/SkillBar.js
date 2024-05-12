import { useEffect } from 'react';

const SkillBar = ({ skills, handleSkillUse, handleEscape, isCountDown, battleStatus, currmp }) => { 
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (battleStatus !== 'continue' || isCountDown) return;

      switch (event.key) {
        case 'a':
          handleSkillUse(0); break;
        case 'q':
          handleSkillUse(1); break;
        case 'w':
          handleSkillUse(2); break;
        case 'e':
          handleSkillUse(3); break;
        case 'r':
          handleSkillUse(4); break;
        case '=':
          handleEscape(); break;
        default:
          break;
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleSkillUse, handleEscape, isCountDown]);
  
  const skillShortcuts = ['q', 'w', 'e', 'r'];
  const skillsWithMana = skills.slice(1);
  const skillButtons = skillsWithMana.map((skill, index) => {
    return (
      // get the users skill set
      
      <button key={index} type="button" className="btn btn-outline-primary btn-lg" onClick={() => handleSkillUse(index + 1)} disabled={battleStatus !== 'continue' || skill.cost > currmp}>
        {skill.name} <span className="badge bg-primary">{skillShortcuts[index].toUpperCase()}</span>
      </button>
    );
  });

  return (
    <div className='row p-3'>
      <div className="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group me-2" role="group" aria-label="Third group">
          <button type="button" className="btn btn-outline-dark btn-lg"
            onClick={() => handleSkillUse(0)} disabled={battleStatus !== 'continue'}
          >普攻 <span className="badge bg-dark">A</span>
          </button>
        </div>
        
        <div className="btn-group me-2" role="group" aria-label="First group">
          {skillButtons}
        </div>
          
        {/* <div className="btn-group me-2" role="group" aria-label="Third group">
          <button type="button" className="btn btn-outline-success btn-lg">道具 <span className="badge bg-success">-</span></button>
        </div> */}
        <div className="btn-group" role="group" aria-label="Third group">
          <button type="button" className="btn btn-outline-secondary btn-lg"
            onClick={handleEscape} disabled={battleStatus !== 'continue'}
          >
            逃跑 <span className="badge bg-secondary">=</span>
            </button>
        </div>
      </div>
    </div>
  );
}

export default SkillBar;