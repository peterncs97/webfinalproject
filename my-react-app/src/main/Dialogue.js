import { useState } from 'react';

const Dialogue = ({ setIsDialogue, prevSceneId, setCurrSceneId }) => {
  const log = [
    {
      id: 1,
      next: 0,
      parentId: 0,
      subject: 'event',
      message: '　　在樹蔭下休息的旅人向你招手。你走近旅人後，卻發現他受傷了。「拜託了．．．請給我回復藥．．．」旅人虛弱地說。',
      option: [
        { id: 2, message: '你把回復藥遞給旅人。' }, 
        { id: 3, message: '雖然感到抱歉，但你選擇轉身離去。' }
      ],
    },
    {
      id: 2,
      next: 4,
      parentId: 0,
      subject: 'player',
      message: '你把回復藥遞給旅人。',
      option: []
    },
    {
      id: 3,
      next: 0,
      parentId: 0,
      subject: 'player',
      message: '雖然感到抱歉，但你選擇轉身離去。',
      option: [{ id: 99, message: "返回" }]
    },
    {
      id: 4,
      next: 5,
      parentId: 1,
      subject: 'event',
      message: '感謝你！我感覺好多了。這是我一點心意，請收下吧。',
      option: []
    },
    {
      id: 5,
      next: 0,
      parentId: 1,
      subject: 'player',
      message: '獲得了100G！',
      option: [{ id: 99, message: "返回"}]
    }
  ];

  const [entries, setEntries] = useState([log[0]]);

  const choose = (event) => {
    const index = parseInt(event.target.getAttribute('index'));
    if (index === 99) {
      setIsDialogue(false);
      setCurrSceneId(prevSceneId);
      return;
    }

    var currEntry = log.find(entry => entry.id === index);
    const nextEntries = [currEntry];
    
    while (currEntry.next !== 0) {
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