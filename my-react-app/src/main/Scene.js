import { useEffect, useState } from 'react';
import axios from "axios";
import { api_url } from '../config';

import OptionList from '../components/OptionList';

const Scene = ({ currSceneId, setCurrSceneId, prevSceneId, setPrevSceneId, setIsBattle, setIsTrade, setIsDialogue }) => {
  const [currScene, setCurrentScene] = useState(null);
  const [opacity, setOpacity] = useState(false);

  useEffect(() => {
    axios.get(`${api_url}/scene/${currSceneId}`).then((response) => {
      setOpacity(false);
      const timeout = setTimeout(() => {
        setOpacity(true);
        setCurrentScene(response.data.data);
      }, 500);
      return () => clearTimeout(timeout);
    });
  }, [currSceneId]);

  const search = () => {
    var parentId;
    if (currScene.type === "victory"){
      parentId = prevSceneId;
    } else {
      setPrevSceneId(currSceneId);
      parentId = currSceneId;
    }
    axios.get(`${api_url}/scene/randchild/${parentId}`).then((response) => {
      setCurrentScene(response.data.data);
    });
    setIsBattle(true);
  }

  const back = () => {
    setCurrSceneId((currScene.parentId !== 0) ? currScene.parentId : prevSceneId);
    setIsBattle(false);
    setIsTrade(false);
  }

  const trade = () => {
    setIsTrade(true); 
  }

  const event = () => {
    setPrevSceneId(currSceneId);
    setIsDialogue(true);
  }

  if (!currScene) return null;

  return (
    <div className={opacity ? "show" : "hide"}>
      <div className='row justify-content-center py-2 border border-3 bg-light'>
        <div className='row p-2'>
          <h3 className='text-center'>{currScene.name}</h3>
        </div>
        <div className='row justify-content-center'>
          <img className="img-fluid home-img fade-in" src={currScene.imagePath} alt={currScene.name} />
          <figcaption className="figure-caption text-center"><small>{currScene.imageDescription}</small></figcaption>
        </div>

        <div className='row pt-4'>
          <p className='lead text-center'><em>{currScene.description}</em></p>
        </div>
        <div className='row'>
          <ul className="list-group list-group-horizontal justify-content-center">
            <OptionList currScene={currScene} setCurrSceneId={setCurrSceneId} search={search} back={back} trade={trade} event={event} />
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Scene;