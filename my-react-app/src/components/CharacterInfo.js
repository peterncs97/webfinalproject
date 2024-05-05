const CharacterInfo = ({ character }) => {
	if (!character) return null;
	const attrs = character.combat_attribute;
	const stats = [
		{ tag: "LV", value: character.level },
		{ tag: "MAX HP", value: attrs.maxhp },
		{ tag: "MAX MP", value: attrs.maxmp },
		{ tag: "ATK", value: attrs.attack },
		{ tag: "DEF", value: attrs.defence },
		{ tag: "PWR", value: attrs.power },
		{ tag: "AGI", value: attrs.agile },
		{ tag: "LCK", value: attrs.luck },
	];

	const statList = stats.map((stat, index) => {
		return (
			<tr key={index}>
				<th scope="row">{stat.tag}</th><td className="text-end">{stat.value}</td>
			</tr>
		);
	});

	const equipments = [
		{ tag: "主手", name: "木劍" },
		{ tag: "副手", name: "木盾"},
		{ tag: "頭部", name: "布帽"},
		{ tag: "身體", name: "布甲" },
		{ tag: "飾品一", name: "銅戒" },
		{ tag: "飾品二", name: "銅戒" },
	];

	const equipmentList = equipments.map((equipment, index) => {
		return (
			<tr key={index}>
				<th scope="row">{equipment.tag}</th><td className="text-end">{equipment.name}</td>
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