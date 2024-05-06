import { useState } from 'react';
import axios from "axios";
import { api_url } from "../../config";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { FaLongArrowAltRight } from "react-icons/fa";

const SplitModal = (props) => {
  const [quantity, setQuantity] = useState(0); // Quantity of the item to trade
  const [moneyAfterTrade, setMoneyAfterTrade] = useState(0); // Total price of the item to trade
  const [disableTradeButton, setDisableTradeButton] = useState(true); // Disable trade button if quantity is 0
  
  // Destructure props
  const { show, onHide, item, belongto, characterid, charactermoney, setCharacter, setCharacterItemList } = props; 

  // Update quantity and moneyAfterTrade when slider changes
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
    // If item belongs to character, the total money after trade is the current money plus the price sum, otherwise, minus the price sum
    setMoneyAfterTrade((belongto === 'character') ? charactermoney + value * item.price : charactermoney - value * item.price);
    setDisableTradeButton(value === 0);
  }

  // When trade button is clicked, settle the trade
  const handleTrade = () => {
    axios.post(`${api_url}/character/trade`, {
      characterId: characterid,
      item: { id: item.id, quantity: quantity }, // Set the item as an object with its id and the quantity from slider
      tradeAction: (belongto === 'character') ? 'sell' : 'buy' // 'sell' if the item belongs to the character, 'buy' otherwise
    }).then((response) => {
      // Update the money and item list of the character
      const updatedCharacter = response.data.data;
      setCharacter(updatedCharacter);
      setCharacterItemList(updatedCharacter.items);
    });
    closeModal(); 
  }

  // When cancel button is clicked, or trade is settled, 
  // hide modal and reset quantity, moneyAfterTrade, and disable trade button
  const closeModal = () => {
    setQuantity(0);
    setMoneyAfterTrade(0);
    setDisableTradeButton(true);
    onHide();
  }

  if (!item) return null;
  // If item belongs to character, the max quantity (for selling) is the quantity of character's item,
  // otherwise, the max quantity (for buying) is the character's money divided by the item's price
  var maxQuantity = 0;
  if (belongto === 'character') {
    maxQuantity = item.item_ownership.quantity;
    if (item.item_ownership.equipped)
      maxQuantity--;
  } else {
    maxQuantity = charactermoney / item.price;
  }

  return (
    <Modal show={show} onHide={onHide} centered aria-labelledby="contained-modal-title-vcenter">
      {/* Item Name */}
      <Modal.Header style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Modal.Title id="contained-modal-title-vcenter" >
          <h3>{item.name}</h3>
        </Modal.Title>
      </Modal.Header>

      {/* Quantity Slider and Money Adjustment */}
      <Modal.Body>
        <Form.Label className='row'>
          <h3 className='text-center'>數量：{quantity} / {maxQuantity}</h3>
        </Form.Label>
        <Form.Range value={quantity} name='quantity-slider' onChange={handleSliderChange} max={maxQuantity} />
        <div className='row'>
          <h3 className='text-center'>持有金額</h3>
        </div>
        <div className='row'>
          <h3 className='text-center'>{charactermoney} <FaLongArrowAltRight /> {moneyAfterTrade}</h3>
        </div>
      </Modal.Body>

      {/* Cancal and Trade Button*/}
      <Modal.Footer className='d-flex justify-content-center'>
        <div className='row flex-fill'>
          <div className='col-6 d-grid gap-2'>
            <Button variant="outline-dark m-1" onClick={closeModal}>取消</Button>
          </div>
          <div className='col-6 d-grid gap-2'>
            <Button variant="outline-dark m-1" onClick={handleTrade} disabled={disableTradeButton}>
              {(belongto === 'character') ? '賣出' : '買入'}
            </Button>
          </div>   
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default SplitModal;