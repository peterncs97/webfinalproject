import { useEffect, useRef } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const SkillBar = ({ skills, handleSkillUse, handleEscape, isCountDown, battleStatus, currmp }) => { 
  const keyATarget = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (battleStatus !== 'continue' || isCountDown) return;

      switch (event.key) {
        case '1':
          handleSkillUse(0); break;
        case '2':
          handleSkillUse(1); break;
        case '3':
          handleSkillUse(2); break;
        case '4':
          handleSkillUse(3); break;
        case '5':
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
  
  const SkillToolTip = ({ id, children, skill }) => (
    <OverlayTrigger 
      placement="bottom" 
      overlay={
        <Tooltip id={id}>
          <div className='p-1'>
            {skill.description}<br />
            魔力消耗：{skill.cost}
          </div>
        </Tooltip>
      }
    >
      {children}
    </OverlayTrigger>
  );

  const skillShortcuts = ['2', '3', '4', '5'];
  const skillsWithMana = skills.slice(1);
  const skillButtons = skillsWithMana.map((skill, index) => {
    return (
      // get the users skill set
      <SkillToolTip skill={skill} id={`t-${index+2}`}>
        <button key={index} type="button" className="btn btn-outline-primary btn-lg" onClick={() => handleSkillUse(index + 1)} disabled={battleStatus !== 'continue' || skill.cost > currmp}>
          {skill.name} <span className="badge bg-primary">{skillShortcuts[index].toUpperCase()}</span>
        </button>
      </SkillToolTip>
    );
  });

  return (
    <div className='row p-3'>
      <div className="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group me-2" role="group" aria-label="Third group">
          <SkillToolTip skill={skills[0]} id="t-1">
            <button type="button" className="btn btn-outline-dark btn-lg"
              ref={keyATarget} onClick={() => handleSkillUse(0)} disabled={battleStatus !== 'continue'}
            >
              普攻 <span className="badge bg-dark">1</span>
            </button>
          </SkillToolTip>
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