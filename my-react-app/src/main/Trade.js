import { useState, useEffect, useContext } from 'react';
import ItemDetail from '../components/Item/ItemDetail';
import ItemContainer from '../components/Item/ItemContainer';
import BeforeTrading from '../components/Trade/BeforeTrading';
import AfterTrading from '../components/Trade/AfterTrading';

import items from '../data/item.json';
import { StateContext } from './Layout';


const Trade = () => {
	const { setState } = useContext(StateContext);
	const [currentItem, setCurrentItem] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);
	const [npcItemList, setNpcItemList] = useState([]);
	const [playerItemList, setPlayerItemList] = useState([]);
	const [belongto, setBelongto] = useState(null);
	const [gold, setGold] = useState(500);
    const [currentItemNumber, setCurrentItemNumber] = useState(null);


	useEffect(() => {
		setCurrentItem(items[0])
		setSelectedItem(items[0])
		setPlayerItemList(items.slice(0, items.length / 2));
		setNpcItemList(items.slice(items.length / 2));
	}, []);

	const showItemInfo = (event) => {
		const index = parseInt(event.target.getAttribute('index'));
		const temp = event.target.getAttribute('belongto');
		if (temp === 'player'){
			setCurrentItem(playerItemList[index]);
			setBelongto('player');
		}
		else if (temp === 'npc'){
			setCurrentItem(npcItemList[index]);
			setBelongto('npc');
		}
	}

	const swapItem = (event) => {
		const index = parseInt(event.target.getAttribute('index'));
		const temp = event.target.getAttribute('belongto');
		if (temp === 'player'){
			setSelectedItem(playerItemList[index]);
			setBelongto('player');
		}
		else if (temp === 'npc'){
			setSelectedItem(npcItemList[index]);
			setBelongto('npc');
		}
	}

	const settle = () => {
		//TODO: settlement request to backend
		setState('default');
	}

	return (
		<>
			<div className="row border border-3">
				<div className='col-4'>
					<ItemContainer title={"背包"} items={playerItemList} belongto={"player"} onMouseEnter={showItemInfo} onClick={swapItem} />
				</div>
				<div className='col-4 border-start border-end	 border-3'>
					<ItemDetail item={currentItem} type={"trade"} />
				</div>
				<div className='col-4'>
					<ItemContainer title={"商人"} items={npcItemList} belongto={"npc"} onMouseEnter={showItemInfo} onClick={swapItem} />
				</div>
			</div>
			<div className="row border border-3">
				<div className='col-5 trade-info' style={{height: '200px'}}>
					<BeforeTrading currentItem={selectedItem} belongto={belongto} gold={gold} currentItemNumber={currentItemNumber} setGold={setGold} setCurrentItemNumber={setCurrentItemNumber} />
				</div>
				<div className='col-2 border-start border-end border-3 d-flex justify-content-center align-items-center'>
					<img className="img-fluid icon mx-2" src="images/swap.svg" style={{width: '75px', height: '75px'}}/>
				</div>
				<div className='col-5 trade-info' style={{height: '200px'}}>
					<AfterTrading coinsAfterTrade={gold} itemsAfterTrade={currentItemNumber}/>
				</div>
			</div>
		</>
	);
}

export default Trade;