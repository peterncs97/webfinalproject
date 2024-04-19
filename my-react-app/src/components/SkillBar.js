import { useEffect } from 'react';

const SkillBar = ({ skills, setCurrSkillId, isCountDown }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isCountDown) return;

      switch (event.key) {
        case 'q':
          setCurrSkillId(0); break;
        case 'w':
          setCurrSkillId(1); break;
        case 'e':
          setCurrSkillId(2); break;
        case 'r':
          setCurrSkillId(3); break;
        default:
          break;
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);
  

  const skillShortcuts = ['q', 'w', 'e', 'r'];
  const skillButtons = skills.map((skill, index) => {
    return (
      <button key={index} type="button" className="btn btn-outline-primary btn-lg" onClick={() => setCurrSkillId(index)}>
        {skill.name} <span className="badge bg-primary">{skillShortcuts[index].toUpperCase()}</span>
      </button>
    );
  
  });

  return (
    <div className='row p-3'>
      <div className="btn-toolbar justify-content-center" role="toolbar" aria-label="Toolbar with button groups">
        <div className="btn-group me-2" role="group" aria-label="Third group">
          <button type="button" className="btn btn-outline-dark btn-lg">普攻 <span className="badge bg-dark">A</span></button>
          <button type="button" className="btn btn-outline-dark btn-lg">防禦 <span className="badge bg-dark">D</span></button>
        </div>
        
        <div className="btn-group me-2" role="group" aria-label="First group">
          {skillButtons}
        </div>
          
        <div className="btn-group me-2" role="group" aria-label="Third group">
          <button type="button" className="btn btn-outline-success btn-lg">道具 <span className="badge bg-success">-</span></button>
        </div>
        <div className="btn-group" role="group" aria-label="Third group">
          <button type="button" className="btn btn-outline-secondary btn-lg">逃跑 <span className="badge bg-secondary">=</span></button>
        </div>
      </div>
    </div>
  );
}

export default SkillBar;