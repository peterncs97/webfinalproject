import { Popover } from 'bootstrap/dist/js/bootstrap.esm.min.js';
import { useState, useEffect } from 'react';
import CharacterInfo from "../components/CharacterInfo";
import Item from '../components/Item';
import Backpack from '../components/Backpack';

import items from '../data/item.json';

const SwapArea = () => {
	const [currentItem, setCurrentItem] = useState(null);
	const [itemList, setItemList] = useState([]);

	useEffect(() => {
		setCurrentItem(items[0])
		setItemList(items);
	}, []);

	const onMouseEnter = (event) => {
		const index = event.target.getAttribute('data');
		setCurrentItem(itemList[index]);
	}

	return (
		<>
			<div className='row justify-content-around'>
				<div className='col-4 py-2'>
					<Backpack items={items} onMouseEnter={onMouseEnter}/>
				</div>

				<div className='col-4 py-2'>
					<Item item={currentItem}/>
				</div>

				<div className='col-4 py-2 '>
					<CharacterInfo />
				</div>

			</div>
		</>
	);
}

export default SwapArea;