// Import packages
import { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { api_url } from '../config';
// Import custom components
import OptionList from '../components/Scene/OptionList';
import OptionModal from '../components/Scene/OptionModal';
// Import current scene id context from Layout.js
import { CurrSceneContext } from './Layout';

const Scene = () => {
  const { currSceneId } = useContext(CurrSceneContext); // Current scene ID from Layout.js
  const [currScene, setCurrentScene] = useState(null); // Current scene data
  const [opacity, setOpacity] = useState(false); // Fade in/out effect
  const [optionModalShow, setOptionModalShow] = useState(false); // Show or hide the option modal
  
  // Fetch scene data when currSceneId changes
  useEffect(() => {
    axios.get(`${api_url}/scene/${currSceneId}`).then((response) => {
      setOpacity(false); // Fade out old scene
      // Fade in new scene after 500ms
      const timeout = setTimeout(() => { 
        setOpacity(true);
        setCurrentScene(response.data.data); // Set current scene data
      }, 500);
      return () => clearTimeout(timeout);
    });
  }, [currSceneId]);

  if (!currScene) return null;

  return (
    <div className={opacity ? "show-fadein" : "hide-fadeout"}>
      <div className='row justify-content-center py-2 border border-3 bg-light'>
        {/* Scene Name */}
        <div className='row p-2'>
          <h3 className='text-center'>{currScene.name}</h3>
        </div>
        {/* Scene Image and Image Credit*/}
        <div className='row justify-content-center'>
          <img className="img-fluid home-img fade-in" src={currScene.imagePath} alt={currScene.name} />
          <figcaption className="figure-caption text-center"><small>{currScene.imageDescription}</small></figcaption>
        </div>
        {/* Scene Description */}
        <div className='row pt-4'>
          <p className='lead text-center'><em>{currScene.description}</em></p>
        </div>
        {/* Scene Options */}
        <div className='row'>
          <OptionList currScene={currScene} setCurrentScene={setCurrentScene} setOptionModalShow={setOptionModalShow}/>   
        </div>
      </div>
      <OptionModal
        show={optionModalShow}
        onHide={() => setOptionModalShow(false)}
      />
    </div>
  )
};

export default Scene;