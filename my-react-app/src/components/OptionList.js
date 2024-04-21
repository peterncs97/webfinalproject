import { useContext } from 'react';
import axios from "axios";
import { api_url } from '../config';

import { StateContext, CurrSceneContext, PrevSceneContext } from '../main/Layout';

const OptionList = ({ currScene, setCurrentScene }) => {
  const { setState } = useContext(StateContext);
  const { currSceneId, setCurrSceneId } = useContext(CurrSceneContext);
  const { prevSceneId, setPrevSceneId } = useContext(PrevSceneContext);
  
  // Basic scene setting options
  const optionList = 
    currScene.options
      ?.filter(option => option.type !== 'monster')
      .map((option, index) => {
        var onClick;
        if (['location', 'battleground', 'trade'].includes(option.type)) 
          onClick = () => setCurrSceneId(option.id)
        else if (option.type === 'event')
          onClick = () => {
            setPrevSceneId(currSceneId);
            setCurrSceneId(option.id);
            setState('dialogue');
          }

        return (
          <button type="button" key={index} onClick={onClick} className="list-group-item">{option.name}</button>
        );
      });

  // Extra general options
  const search = () => {
    axios.get(`${api_url}/scene/randchild/${currSceneId}`).then((response) => {
      setCurrentScene(response.data.data);
      setState('battle')
    });
  }

  const extraOptions = [
    { types: ['battleground', 'victory'], name: '索敵', onClick: search },
    { types: ['trade'], name: '交易', onClick: () => setState('trade') },
  ];

  extraOptions.forEach(option => {
    if (option.types.includes(currScene.type))
      optionList.push(
        <button type="button" key={optionList.length} onClick={option.onClick} className="list-group-item">
          {option.name}
        </button>);
  });

  // Default return option
  if (currScene.type !== "monster" && currScene.type !== 'event' && currScene.id !== 1)
    optionList.push(
      <button type="button" key={optionList.length} className="list-group-item" 
        onClick={() => { setState('default'); setCurrSceneId((currScene.parentId !== 0) ? currScene.parentId : prevSceneId); }} >
        返回
      </button>);

  return optionList;
}

export default OptionList;



