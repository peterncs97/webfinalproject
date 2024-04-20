import { useState, useContext } from 'react';
import { StateContext, CurrSceneContext, PrevSceneContext } from './Layout';
import log from '../data/dialogue.json';

const Dialogue = () => {
  const { setState } = useContext(StateContext);
  const { setCurrSceneId } = useContext(CurrSceneContext);
  const { prevSceneId } = useContext(PrevSceneContext);
  const [entries, setEntries] = useState([log[0]]);

  const choose = (event) => {
    const index = parseInt(event.target.getAttribute('index'));
    if (index === 99) {
      setState('default');
      setCurrSceneId(prevSceneId);
      return;
    }

    var currEntry = log.find(entry => entry.id === index);
    const nextEntries = [currEntry];
    
    while (currEntry && currEntry.next !== 0) {
      const nextEntry = log.find(entry => entry.id === currEntry.next);
      nextEntries.push(nextEntry);
      currEntry = nextEntry;
    }

    setEntries([...entries, ...nextEntries]);
    event.target.parentNode.remove();
  }

  const optionList = (entry) => {
    return entry.option.map((option, index) => {
      return (
        <p key={index} className='text-option-hover text-center text-secondary lead' index={option.id} onClick={choose}>{option.message}</p>
      );
    });
  }

  const entryList = entries.map((entry) => {
    var justify = (entry.subject === 'player') ? 'end' : 'start';
    return (
      <div className='show-slow border-bottom mb-3'>
        <div className={`d-flex justify-content-${justify} m-4`}>
          <div className="lead" >
            {entry.message}
          </div >
        </div>
        <div>
          {optionList(entry)}
        </div>
      </div>
    );
  }); 

  return (
    <div className='row'>
      <div className='d-flex flex-column-reverse border border-3 overflow-auto' style={{ height: 350 }}>
        <div className='row justify-content-center'>
          <div className="col-8" >
            {entryList}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialogue;