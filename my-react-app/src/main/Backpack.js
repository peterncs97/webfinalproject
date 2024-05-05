import { useState, useEffect } from 'react';
import CharacterInfo from "../components/CharacterInfo";
import ItemDetail from '../components/Item/ItemDetail';
import ItemContainer from '../components/Item/ItemContainer';

const Backpack = ({ character }) => {
	const [currentItem, setCurrentItem] = useState(null);
	const [playerItemList, setPlayerItemList] = useState([]);

	useEffect(() => {
		setCurrentItem(character?.items[0])
		setPlayerItemList(character?.items);
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
					<ItemDetail item={currentItem} type={currentItem?.type} />
				</div>

				<div className='col-4'>
					<CharacterInfo character={character}/>
				</div>
			</div>
		</>
	);
}

export default Backpack;