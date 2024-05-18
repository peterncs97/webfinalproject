// Import packages
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import contexts from Layout.js
import { ActionContext, CharacterContext } from '../../../main/Main';

// Construct option list based on current scene
// Include basic travel option, special scene options and return option
const OptionList = ({ currScene, setOptionModalShow }) => {
  const navigate = useNavigate();
  const { setAction } = useContext(ActionContext); // For controll state of the game
  const { character, setCharacter } = useContext(CharacterContext); // For updating character data

  const optionList = [];

  /* Special scene options  */
  const extraOptions = [
    { types: ['rest'], name: '休息', onClick: () => { setOptionModalShow(true) } },
    { types: ['battleground'], name: '索敵', onClick: () => { navigate("/battle") } },
    { types: ['trade'], name: '交易', onClick: () => setAction('trade') },
  ];

  // Push special options to optionList
  extraOptions.forEach(option => {
    if (option.types.includes(currScene.type))
      optionList.push(
        <button type="button" key={optionList.length} onClick={option.onClick} className="list-group-item">
          {option.name}
        </button>);
  });

  /* Basic travel to scene options */
  const changeScene = (event) => {
    const sceneId = parseInt(event.target.getAttribute('sceneid'));
    axios.post(`/character/changescene`, { characterId: character.id, sceneId: sceneId })
      .then((response) => {
        setCharacter(response.data.data);
      }).catch((error) => {
        console.error('Error changing scene: ', error);
      });
  }

  currScene.options
    ?.filter(option => option.type !== 'monster') // Filter out monster scene
    .forEach((option, index) => {
      optionList.push(
        <button type="button" key={index} sceneid={option.id} onClick={changeScene} className="list-group-item">{option.name}</button>
      );
    });

  /* Default return option */
  if (currScene.id !== 1)
    optionList.push(
      <button type="button" key={optionList.length} className="list-group-item"
        sceneid={currScene.parentId}
        onClick={(event) => { changeScene(event); setAction('default'); }} >
        返回
      </button>);

  return (
    <ul className="list-group list-group-horizontal justify-content-center">
      {optionList}
    </ul>
  );
}

export default OptionList;



