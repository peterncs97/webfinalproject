// Import Packages
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { api_url } from "../config";

// Import Custom Components
import ItemDetail from '../components/Item/ItemDetail';
import ItemContainer from '../components/Item/ItemContainer';
import SplitModal from '../components/Trade/SplitModal';

// Import Contexts set up in Layout.js
import { CurrSceneContext } from './Layout';
import { CharacterContext } from './Layout';

const Trade = () => {
	const { currSceneId } = useContext(CurrSceneContext);
	const { character, setCharacter } = useContext(CharacterContext);

	const [merchantItemList, setMerchantItemList] = useState([]); // Item list to be displayed at the merchant box
	const [characterItemList, setCharacterItemList] = useState([]); // Item list to be displayed at the backpack box

	const [currentItem, setCurrentItem] = useState(null); // Current item to be displayed in the item detail box when mouse hovers on an item
	const [currentItemBelongTo, setCurrentItemBelongTo] = useState(null); // Current item belong to character or merchant
	const [splitModalShow, setSplitModalShow] = useState(false); // Show or hide the quantity splitting modal

	// Set the current item to the first item in the character's inventory
	// Set up item list of the character and the merchant respectively
	useEffect(() => {
		setCurrentItem(character.items[0])
		setCharacterItemList(character.items);
		axios.get(`${api_url}/merchant/getBySceneId/${currSceneId}`)
		.then((response) => {
			setMerchantItemList(response.data.data.items);
		});
	}, [character.items, currSceneId]);

	// When mouse hovers on an item, set up current item and show its detail
	const showItemInfo = (event) => {
		// index and belongto are set up in ItemContainer.js when rendering both item lists
		const index = parseInt(event.target.getAttribute('index'));
		const belongto = event.target.getAttribute('belongto');
		if (belongto === 'character')
			setCurrentItem(characterItemList[index]);
		else if (belongto === 'merchant')
			setCurrentItem(merchantItemList[index]);
		setCurrentItemBelongTo(belongto);
	}

	return (
		<>
			<div className="row border border-3">
				{/* Display the character's inventory */}
				<div className='col-4'>
					<ItemContainer 
						title={"背包"} 
						items={characterItemList}
						money={character.money}
						belongto={"character"}
						onMouseEnter={showItemInfo} 
						setSplitModalShow={setSplitModalShow}
					/>
				</div>

				{/* Display detail of the current item hovered on by mouse */}
				<div className='col-4 border-start border-end	 border-3'>
					<ItemDetail item={currentItem} type={"trade"} />
				</div>
				
				{/* Display the merchant's inventory */}
				<div className='col-4'>
					<ItemContainer 
						title={"商人"} 
						items={merchantItemList} 
						belongto={"merchant"} 
						onMouseEnter={showItemInfo} 
						setSplitModalShow={setSplitModalShow} 
					/>
				</div>
			</div>

			{/* Quantity splitting modal */}
			<SplitModal 
				show={splitModalShow} 
				onHide={() => setSplitModalShow(false)} 
				item={currentItem} 
				belongto={currentItemBelongTo}
				characterid={character.id}
				charactermoney={character.money} 
				setCharacter={setCharacter}
				setCharacterItemList={setCharacterItemList}
			/>
		</>
	);
}

export default Trade;