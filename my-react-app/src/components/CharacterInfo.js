// Import packages
import { useState, useEffect, useContext } from 'react';

// Import contexts from Layout.js
import { CharacterContext } from '../main/Layout';

const CharacterInfo = ({ setCurrentItem }) => {
	const { character } = useContext(CharacterContext);
	const [equipments, setEquipments ] = useState([]);
	const [total_equip_attrs, setTotalEquipAttrs ] = useState({});

	useEffect(() => {
		if (!character) return;
		const characterEquipments = character.items.filter(item => item.item_ownership.equipped)
		const weapon = characterEquipments.find(item => item.equipment_attribute.bodypart === "weapon");
		const body = characterEquipments.find(item => item.equipment_attribute.bodypart === "body");
		setEquipments([weapon, body]);
		setTotalEquipAttrs(
			characterEquipments
				.map(item => item.equipment_attribute)
				.reduce((acc, cur) => {
					for (let key in cur)
						if (cur.hasOwnProperty(key) && key !== "bodypart")
							acc[key] = (acc[key] || 0) + cur[key];
					return acc;
				}, {})
		);
	}, [character]);

	if (!character || !equipments) return null;
	
	const showEquipmentInfo = (event) => {
		const index = event.target.getAttribute('index');

		setCurrentItem(equipments[index]);
	}

	const weapon = equipments[0];
	const body = equipments[1];
	const equipmentObjs = [
		{ tag: "武器", name: weapon ? weapon.name : "無", itemId: weapon ? weapon.id : -1},
		{ tag: "身體", name: body ? body.name : "無", itemId: body ? body.id : -1},
	];

	const equipmentList = equipmentObjs.map((equipment, index) => {
		return (
			<tr key={index}>
				<th scope="row" className="align-middle">{equipment.tag}</th>
				<td className="align-middle text-center">
					{
						(equipment.name === "無") ? "無" :
							<button className="btn btn-outline-dark" index={index} itemID={equipment.itemId} onMouseEnter={showEquipmentInfo}>
								{equipment.name}
							</button>
					}
				</td>
			</tr>
		);
	});

	const character_attrs = character.combat_attribute;
	const stats = [
		{ tag: "LV", cvalue: character.level, evalue: 0 },
		{ tag: "MAX HP", cvalue: character_attrs.maxhp, evalue: total_equip_attrs.maxhp || 0},
		{ tag: "MAX MP", cvalue: character_attrs.maxmp, evalue: total_equip_attrs.maxmp || 0},
		{ tag: "ATK", cvalue: character_attrs.attack, evalue: total_equip_attrs.attack || 0},
		{ tag: "DEF", cvalue: character_attrs.defence, evalue: total_equip_attrs.defence || 0 },
		{ tag: "PWR", cvalue: character_attrs.power, evalue: total_equip_attrs.power || 0 },
		{ tag: "AGI", cvalue: character_attrs.agile, evalue: total_equip_attrs.agile || 0 },
		{ tag: "LCK", cvalue: character_attrs.luck, evalue: total_equip_attrs.luck || 0 },
	];

	const statList = stats.map((stat, index) => {
		return (
			<tr key={index}>
				<th scope="row">{stat.tag}</th>
				<td>
					<span className="text-primary">{stat.cvalue}</span>
					 + 
					<span className="text-success">{stat.evalue}</span>
					
				</td>
			</tr>
		);
	});

	return (
		<>
			<div className="row justify-content-center p-2">
				<div className="row h3 mx-2 pb-1 border-bottom">
					角色
				</div>
				<div className="table-responsive">
					<table className="table">
						<tbody>
							<tr>
								<td>
									<table className="table table-hover">
										<thead>
											<tr>
												<th colSpan="2">裝備</th>
											</tr>
										</thead>
										<tbody>
											{equipmentList}
										</tbody>
									</table>
								</td>
								<td>
									<table className="table table-hover ">
										<thead>
											<tr>
												<th colSpan="2">能力</th>
											</tr>
										</thead>
										<tbody>
											{statList}
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}

export default CharacterInfo;