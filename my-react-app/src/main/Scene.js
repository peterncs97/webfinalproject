import { useEffect, useState } from 'react';
import scenes from '../data/scene.json';

const Scene = ({ currentSceneId, setCurrentSceneId, setIsBattle }) => {
  const [currentScene, setCurrentScene] = useState(scenes[currentSceneId]);

  useEffect(() => {
    setCurrentScene(scenes.find(scene => scene.id === currentSceneId));
  }, [currentSceneId]);

  const search = (event) => {
    const index = event.target.getAttribute('data');
    setCurrentScene(scenes.find(scene => scene.parentId === parseInt(index)));
    setIsBattle(true);
  }

  const endBattle = (event) => {
    const index = event.target.getAttribute('data');
    setCurrentScene(scenes.find(scene => scene.id === parseInt(index)));
    setIsBattle(false);
  }

  if (!currentScene) return null;

  const optionList = currentScene.option.map((option, index) => {
    switch(option.type) {
      case 'GOTO':
        return (
          <button type="button" key={index} data={option.id} onClick={() => setCurrentSceneId(option.id)} className="list-group-item">  
              {option.name}
          </button>
        );
      case 'SEARCH':
        return (
          <button type="button" key={index} data={option.id} onClick={search} className="list-group-item">
            {option.name}
          </button>
        );
      case 'ENDBATTLE':
        return (
          <button type="button" key={index} data={option.id} onClick={endBattle} className="list-group-item">
            {option.name}
          </button>
        );
      default:
        return (
          <button type="button" key={index} className="list-group-item">{option.name}</button>
        );
    }
  });

  return (
    <section className="bg-light">
      <div className='col-10 mx-auto'>
        <div className='row justify-content-center'>
          <div className='row p-2'>
            <h3 className='text-center'>{currentScene.name}</h3>
          </div>
          <div className='row justify-content-center'>
            <img className="img-fluid home-img" src={currentScene.image} alt={currentScene.name} />
            <figcaption className="figure-caption text-center"><small>{currentScene.imageDescription}</small></figcaption>
          </div>

          <div className='row pt-4'>
            <p className='lead text-center'><em>{currentScene.description}</em></p>
          </div>
          <div className='row'>
            <ul className="list-group list-group-horizontal justify-content-center">
              {optionList}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Scene;