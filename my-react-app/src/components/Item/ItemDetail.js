// Import packages
import { useContext } from 'react';
import axios from "axios";

// Import api url from config.js
import { api_url } from '../../config';

// Import contexts from Layout.js
import { CharacterContext } from '../../main/Layout';
import { StateContext } from '../../main/Layout';

const ItemDetail = ({ item }) => {
	const { character, setCharacter } = useContext(CharacterContext);
	const { state } = useContext(StateContext);
	if (!item) return;
	
	const equip = () => {
		axios.post(`${api_url}/character/equip`, {
			characterId: character.id,
			itemId: item.id,
		}).then((response) => {
			setCharacter(response.data.data)
		}).catch((err) => {
			console.log(err);
		});
	}

	const unequip = () => {
		axios.post(`${api_url}/character/unequip`, {
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
		(state === 'trade')
			? { name: '', onClick: () => { }} 
			:	
			(item.type !== 'equipment') 
				? { name: '使用', onClick: () => { }}
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
				(state === 'default') ?
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