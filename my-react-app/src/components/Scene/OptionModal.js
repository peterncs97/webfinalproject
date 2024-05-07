// Import packages
import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";

// Import api url from config.js
import { api_url } from '../../config';

// Import contexts from Layout.js
import { CharacterContext } from '../../main/Layout';

const OptionModal = (props) => {
  const { character, setCharacter } = useContext(CharacterContext);
  const [disableConfirmButton, setDisableConfirmButton] = useState(false);
  const { show, onHide } = props; 
  
  const handleConfirm = () => {
    if (character.money < 300) {
      setDisableConfirmButton(true)
      alert('金幣不足！');
      return;
    }
    else {
      setDisableConfirmButton(false);
      axios.post(`${api_url}/character/restoreHP`, {
        characterId: character.id,
        hp: 50
      }).then((response) => {
        setCharacter(response.data.data);
      });
    }
    closeModal();
  }

  const closeModal = () => {
    onHide();
  }

  return (
    <Modal show={show} onHide={onHide} centered aria-labelledby="contained-modal-title-vcenter">
      {/* Option Name */}
      <Modal.Header style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Modal.Title id="contained-modal-title-vcenter" >
        要休息嗎？
        </Modal.Title>
      </Modal.Header>

      {/* Option Description */}
      <Modal.Body style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        花費金幣補充體力，繼續冒險！ <br/>
        300金幣可提昇50HP <br/>
        您目前擁有：{character.money}金幣
      </Modal.Body>

      {/* Cancal and Confirm Button*/}
      <Modal.Footer className='d-flex justify-content-center'>
        <div className='row flex-fill'>
          <div className='col-6 d-grid gap-2'>
            <Button variant="outline-dark m-1" onClick={closeModal}>取消</Button>
          </div>
          <div className='col-6 d-grid gap-2'>
            <Button variant="outline-dark m-1" onClick={handleConfirm} disabled={disableConfirmButton}>確定</Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default OptionModal;