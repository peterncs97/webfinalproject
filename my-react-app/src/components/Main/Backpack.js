import { useState, useEffect } from 'react';
import CharacterInfo from "./Backpack/CharacterInfo";
import ItemDetail from './Item/ItemDetail';
import ItemContainer from './Item/ItemContainer';

const Backpack = ({ character }) => {
	const [currentItem, setCurrentItem] = useState(null);
	const [playerItemList, setPlayerItemList] = useState([]);

	useEffect(() => {
		setCurrentItem(null)
		setPlayerItemList(
			// Hide equipped items with quantity 1
			character?.items.filter(item => !(item.item_ownership.equipped && item.item_ownership.quantity === 1))
		);
	}, [character]);

	const showItemInfo = (event) => {
		const index = event.target.getAttribute('index');
		setCurrentItem(playerItemList[index]);
	}

	return (
		<>
			<div className='row border border-3'>
				<div className='col-4'>
					<ItemContainer title={"背包"} items={playerItemList} money={character?.money} belongto={"character"} onMouseEnter={showItemInfo}/>
				</div>

				<div className='col-4 border-start border-end border-3'>
					<ItemDetail item={currentItem}/>
				</div>

				<div className='col-4'>
					<CharacterInfo character={character} setCurrentItem={setCurrentItem} />
				</div>
			</div>
		</>
	);
}

export default Backpack;