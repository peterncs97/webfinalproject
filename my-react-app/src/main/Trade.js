import { useState, useEffect, useContext } from 'react';
import ItemDetail from '../components/Item/ItemDetail';
import ItemContainer from '../components/Item/ItemContainer';

import items from '../data/item.json';
import { StateContext } from './Layout';

const Trade = () => {
	const { setState } = useContext(StateContext);
	const [currentItem, setCurrentItem] = useState(null);
	const [npcItemList, setNpcItemList] = useState([]);
	const [playerItemList, setPlayerItemList] = useState([]);

	useEffect(() => {
		setCurrentItem(items[0])
		setPlayerItemList(items.slice(0, items.length / 2));
		setNpcItemList(items.slice(items.length / 2));
	}, []);

	const showItemInfo = (event) => {
		const index = parseInt(event.target.getAttribute('index'));
		const belongto = event.target.getAttribute('belongto');
		if (belongto === 'player')
			setCurrentItem(playerItemList[index]);
		else if (belongto === 'npc')
			setCurrentItem(npcItemList[index]);
	}

	const swapItem = (event) => {
		const index = parseInt(event.target.getAttribute('index'));
		const belongto = event.target.getAttribute('belongto');
		if (belongto === 'player'){
			setPlayerItemList(playerItemList.filter((item, i) => i !== index));
			setNpcItemList([playerItemList[index], ...npcItemList]);
		}
		else if (belongto === 'npc')
		{
			setNpcItemList(npcItemList.filter((item, i) => i !== index));
			setPlayerItemList([npcItemList[index], ...playerItemList]);
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
			<div className="d-grid gap-2">
				<button className="btn btn-dark mt-2" type="button" onClick={settle}>
					結算
				</button>
			</div>
		</>
	);
}

export default Trade;