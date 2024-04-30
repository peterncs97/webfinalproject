import { useState, useEffect, useContext } from 'react';

const ItemContainer = ({ title, items, belongto, onMouseEnter, onClick  }) => {
    const [quantity, setQuantity] = useState(1);
    const [inputValue, setInputValue] = useState(0);


    if (!items)
        items = [];

    const itemList = items.map((item, index) => {
        return (
            <button key={index} className="btn btn-outline-dark m-1" 
                type="button" index={index} belongto={belongto}
                onMouseEnter={onMouseEnter} onClick={onClick}>
                {item.name}
            </button>
        );
    });
    
    return (
        <div className="row justify-content-center p-2">
            <div className="row h3 mb-2 pb-1 border-bottom">
                {title}
            </div>
            <div className="d-flex align-content-start flex-wrap overflow-auto"
                style={{ height: 250 }}>
                {itemList}
            </div>
            <div className="row" >
                <div className='col-5 py-2'>
                    <div className="input-group">
                        <p 
                            className="input-group-text" 
                            style={{ backgroundColor: 'black', color: 'white', border: 'none',height: '38px'}}
                            onClick={() => setQuantity(inputValue)}>
                            分割
                        </p>
                        <input type="number" 
                        className="form-control" 
                        style={{height: '38px'}} 
                        value={inputValue} 
                        onChange={e => setInputValue(e.target.value)}/>
                    </div>
                </div>
                <div className="col-7">
                    <button className="btn btn-dark mt-2" type="button">交易</button>
                </div>
            </div>
        </div>
    );
};

export default ItemContainer;