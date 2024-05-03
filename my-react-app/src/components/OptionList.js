// Import packages
import { useContext } from 'react';
import axios from "axios";
// Import api url from config.js
import { api_url } from '../config';

// Import contexts from Layout.js
import { StateContext, CurrSceneContext, PrevSceneContext } from '../main/Layout';

// Construct option list based on current scene
// Include basic travel option, special scene options and return option
const OptionList = ({ currScene, setCurrentScene, setOptionModalShow }) => {
  const { setState } = useContext(StateContext); // For controll state of the game
  const { currSceneId, setCurrSceneId } = useContext(CurrSceneContext); // For updating current scene id
  const { prevSceneId, setPrevSceneId } = useContext(PrevSceneContext); // For updating previous scene id

  /* Basic travel to scene options */

  // Set onClick function of places based on its scene type
  const onClickFunction = (option) => {
    // For 'location', 'rest', 'battleground', 'trade' scenes
    // Simply update current scene id
    if (['location', 'rest', 'battleground', 'trade'].includes(option.type))
      return () => setCurrSceneId(option.id)
    // For 'event' scenes, update prev and current scene id and set state to 'dialogue'
    else if (option.type === 'event')
      return () => {
        setPrevSceneId(currSceneId);
        setCurrSceneId(option.id);
        setState('dialogue');
      }
  }

  // Map travel options to buttons
  const optionList =
    currScene.options
      ?.filter(option => option.type !== 'monster') // Filter out monster scene
      .map((option, index) => {
        const onClick = onClickFunction(option);
        return (
          <button type="button" key={index} onClick={onClick} className="list-group-item">{option.name}</button>
        );
      });

  /* Special scene options  */

  // OnClick function for searching option in battleground scene
  const search = () => {
    axios.get(`${api_url}/scene/randchild/${currSceneId}`).then((response) => {
      setCurrentScene(response.data.data);
      setState('battle')
    });
  }

  // OnClick function for rest option in rest scene
  const rest = () => {
    setOptionModalShow(true);
  }

  const extraOptions = [
    { types: ['rest'], name: '休息', onClick: rest },
    { types: ['battleground', 'victory'], name: '索敵', onClick: search },
    { types: ['trade'], name: '交易', onClick: () => setState('trade') },
  ];

  // Push special options to optionList
  extraOptions.forEach(option => {
    if (option.types.includes(currScene.type))
      optionList.push(
        <button type="button" key={optionList.length} onClick={option.onClick} className="list-group-item">
          {option.name}
        </button>);
  });

  /* Default return option */
  if (currScene.type !== "monster" && currScene.type !== 'event' && currScene.id !== 1)
    optionList.push(
      <button type="button" key={optionList.length} className="list-group-item"
        onClick={() => { setState('default'); setCurrSceneId((currScene.parentId !== 0) ? currScene.parentId : prevSceneId); }} >
        返回
      </button>);

  return (
    <ul className="list-group list-group-horizontal justify-content-center">
      {optionList}
    </ul>
  );
}

export default OptionList;



