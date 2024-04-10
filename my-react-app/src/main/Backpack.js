import { useState, useEffect } from 'react';
import CharacterInfo from "../components/CharacterInfo";
import ItemDetail from '../components/ItemDetail';
import ItemContainer from '../components/ItemContainer';

import items from '../data/item.json';

const Backpack = () => {
	const [currentItem, setCurrentItem] = useState(null);
	const [playerItemList, setPlayerItemList] = useState([]);

	useEffect(() => {
		setCurrentItem(items[0])
		setPlayerItemList(items);
	}, []);

	const showItemInfo = (event) => {
		const index = event.target.getAttribute('index');
		setCurrentItem(playerItemList[index]);
	}

	return (
		<>
			<div className='row border border-3'>
				<div className='col-4'>
					<ItemContainer title={"背包"} items={playerItemList} onMouseEnter={showItemInfo}/>
				</div>

				<div className='col-4 border-start border-end border-3'>
					<ItemDetail item={currentItem} type={currentItem?.type} />
				</div>

				<div className='col-4'>
					<CharacterInfo />
				</div>
			</div>
		</>
	);
}

export default Backpack;