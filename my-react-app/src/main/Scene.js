import { useState } from 'react';
import scenes from '../data/scene.json';
import { Link } from 'react-router-dom';

const Scene = () => {
  const [currentScene, setCurrentScene] = useState(scenes[0]);

  const goto = (event) => {
    const index = event.target.getAttribute('data');
    setCurrentScene(scenes.find(scene => scene.id == index));
  }

  if (!currentScene) return null;

  const optionList = currentScene.option.map((option, index) => {
    switch(option.type) {
      case 'GOTO':
        return (
          <button type="button" key={index} data={option.id} onClick={goto} className="list-group-item">  
              {option.name}
          </button>
        );
      case 'BATTLE':
        return (
          <button type="button" key={index} className="list-group-item">
            <Link to="/battle">{option.name}</Link>
          </button>
        );
      case 'ENDBATTLE':
        return (
          <button type="button" key={index} className="list-group-item">
            <Link to="/">{option.name}</Link>
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