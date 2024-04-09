import { useEffect, useState } from 'react';
import axios from "axios";
import { api_url } from '../config';

import OptionList from '../components/OptionList';

const Scene = ({ currSceneId, setCurrSceneId, prevSceneId, setPrevSceneId, setIsBattle }) => {
  const [currScene, setCurrentScene] = useState(null);

  useEffect(() => {
    axios.get(`${api_url}/scene/${currSceneId}`).then((response) => {
      setCurrentScene(response.data.data);
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
  }

  if (!currScene) return null;

  return (
    <section className="bg-light">
      <div className='col-10 mx-auto'>
        <div className='row justify-content-center'>
          <div className='row p-2'>
            <h3 className='text-center'>{currScene.name}</h3>
          </div>
          <div className='row justify-content-center'>
            <img className="img-fluid home-img" src={currScene.imagePath} alt={currScene.name} />
            <figcaption className="figure-caption text-center"><small>{currScene.imageDescription}</small></figcaption>
          </div>

          <div className='row pt-4'>
            <p className='lead text-center'><em>{currScene.description}</em></p>
          </div>
          <div className='row'>
            <ul className="list-group list-group-horizontal justify-content-center">
              <OptionList currScene={currScene} setCurrSceneId={setCurrSceneId} search={search} back={back} />
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Scene;