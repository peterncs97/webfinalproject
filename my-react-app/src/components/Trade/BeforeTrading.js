import React, { useState } from 'react';

const BeforeTrading = ({ currentItem,belongto,gold,currentItemNumber,setGold,setCurrentItemNumber}) => {
    const [quantity, setQuantity] = useState(1);
    const [currentgold, setcurrentGold] = useState(gold);
    const onTransaction = (amount) => {
        if (belongto === 'player'){
            setCurrentItemNumber(Number(currentItem.hodings) - Number(amount));
            setGold(currentgold + currentItem.price*amount);
        }
        if (belongto === 'npc'){
            setCurrentItemNumber(Number(currentItem.hodings) + Number(amount));
            setGold(currentgold - currentItem.price*amount);
        }
      };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
        onTransaction(event.target.value);
    }

    const handleClick = () => {
        updatecurrentGold();
        handleBuy();
        setQuantity(0);
      };
    
    const updatecurrentGold = () => {
        setcurrentGold(gold);
    }

    const handleBuy = () => {
        onTransaction(quantity);
    };


      return (
        <div className="row p-2">
            <div className="col-12 border-bottom ">
                <h4>當前持有金幣：{currentgold}</h4>
            </div>
            <div className="row">
                <div 
                    className='col-4 py-3 text-uppercase font-weight-bold' 
                    style={{ color: 'darkblue', fontSize: '20px' }}
                >
                    {currentItem && <h5>{currentItem.name}</h5>}
                </div>
                <div className='col-3 py-3'>
                    <h5>擁有：{currentItem && currentItem.hodings}</h5>
                </div>
                <div className='col-5 py-2'>
                    <div className="input-group">
                        <p 
                            className="input-group-text" 
                            style={{ backgroundColor: 'black', color: 'white', border: 'none',height: '38px'}}>
                            交易量
                        </p>
                        <input type="number" className="form-control" style={{height: '38px'}} value={quantity} onChange={handleQuantityChange}  />
                    </div>
                </div>
            </div>
            <div className="d-grid gap-2">
				<button 
                    style={{ width: '50%', 'justify-self': 'end'}} 
                    className="btn btn-dark mt-2" 
                    type="button"
                    onClick={handleClick}
                >
                    結算
                </button>
			</div>
        </div>
      );
}

export default BeforeTrading;