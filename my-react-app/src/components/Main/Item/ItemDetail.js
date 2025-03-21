// Import packages
import { useContext } from 'react';
import axios from "axios";

// Import contexts from Layout.js
import { CharacterContext, ActionContext } from '../../../main/Main';

const ItemDetail = ({ item }) => {
	const { character, setCharacter } = useContext(CharacterContext);
	const { action } = useContext(ActionContext);
	if (!item) return;
	
	const equip = () => {
		axios.post(`/character/equip`, {
			characterId: character.id,
			itemId: item.id,
		}).then((response) => {
			setCharacter(response.data.data)
		}).catch((err) => {
			console.log(err);
		});
	}

	const unequip = () => {
		axios.post(`/character/unequip`, {
			characterId: character.id,
			itemId: item.id,
		}).then((response) => {
			setCharacter(response.data.data)
		}).catch((err) => {
			console.log(err);
		});
	}

	const useItem = () => {
		axios.post(`/character/useitem`, {
			characterId: character.id,
			itemId: item.id,
		}).then((response) => {
			setCharacter(response.data.data)
		}).catch((err) => {
			console.log(err);
		});
	}

	var bodypartName;
	switch(item?.equipment_attribute?.bodypart){
		case 'weapon':
			bodypartName = '武器';
			break;
		case 'body':
			bodypartName = '身體';
			break;
		default:
			bodypartName = '／';
	}

	const option = 
		(action === 'trade')
			? { name: '', onClick: () => { }} 
			:	
			(item.type !== 'equipment') 
				? { name: '使用', onClick: useItem }
				:
				(!item.item_ownership.equipped) 
					? { name: '裝備', onClick: equip } 
					: { name: '卸下', onClick: unequip }; 

	return (
		<div className="row justify-content-center p-2">
			<div className="row h3 mb-2 pb-1 border-bottom">
				{item.name}
			</div>
				
			<div className="table-responsive">
				<table className="table table-hover ">
					<thead>
					</thead>
					<tbody>
						<tr>
							<th scope="row">種類</th>
							<td className="text-end">{(item.type === 'equipment') ? '裝備' : '消耗品'}</td>
						</tr>
						<tr>
							<th scope="row">部位</th>
							<td className="text-end">{bodypartName}</td>
						</tr>
						<tr>
							<th scope="row">效果</th>
							<td className="text-end">{item.description}</td>
						</tr>
						<tr>
							<th scope="row">價格</th>
							<td className="text-end">{item.price}</td>
						</tr>
					</tbody>
				</table>
			</div>
			{
				(action === 'default') ?
				<div className="row">
					<button className="btn btn-dark" type="button" onClick={option.onClick}>
						{option.name}
					</button>
				</div>
				: null
			}
		</div>
	);
}

export default ItemDetail;