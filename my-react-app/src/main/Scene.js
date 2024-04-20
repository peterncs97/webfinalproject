import { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { api_url } from '../config';

import OptionList from '../components/OptionList';
import { CurrSceneContext } from './Layout';

const Scene = () => {
  const { currSceneId } = useContext(CurrSceneContext);
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

  if (!currScene) return null;

  return (
    <div className={opacity ? "show-fadein" : "hide-fadeout"}>
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
            <OptionList currScene={currScene} setCurrentScene={setCurrentScene}/>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Scene;