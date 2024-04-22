import React, { useState, useEffect } from 'react';

const AfterTrading = ({ coinsAfterTrade, itemsAfterTrade}) => {
  const [coins, setCoins] = useState(0);
  const [items, setItems] = useState(0);

  useEffect(() => {
    setCoins(coinsAfterTrade);
    setItems(itemsAfterTrade);
  }, [coinsAfterTrade, itemsAfterTrade]);

  return (
    <div className='py-1 my-3'style={{ border: '1px solid black', backgroundColor: '#f2f2f2', padding: '10px', borderRadius: '5px' }}>
        <h4>交易後金幣數量: {coins}</h4>
        <h4>交易後物品數量: {items}</h4>
    </div>
  );
};

export default AfterTrading;