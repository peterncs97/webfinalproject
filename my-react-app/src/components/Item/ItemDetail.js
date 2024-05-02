const ItemDetail = ({ item, type }) => {
	if (!item)
		item = { };
	
	const options = [
		{ type: 'equipment', name: '裝備', onClick: () => { } },
		{ type: 'consumable', name: '使用', onClick: () => { } },
	].filter(option => option.type === type);

	const optionList = options.map((option, index) => {
		return (
			<button key={index} className="btn btn-dark" type="button" onClick={option.onClick}>
				{option.name}
			</button>
		);
	});

	return (
		<div className="row justify-content-center p-2">
			<div className="row h3 mb-2 pb-1 border-bottom">
				{item.name}
			</div>
				<p className="initialism">{item.description}</p>
			<div className="table-responsive">
				<table className="table table-hover ">
					<thead>
					</thead>
					<tbody>
						<tr>
							<th scope="row">種類</th><td className="text-end">{(item.type === 'equipment') ? '裝備' : '消耗品'}</td>
						</tr>
						<tr>
							<th scope="row">ATK</th><td className="text-end">{item.atk}</td>
						</tr>
						<tr>
							<th scope="row">DEF</th><td className="text-end">{item.def}</td>
						</tr>
						<tr>
							<th scope="row">效果</th><td className="text-end">{item.description}</td>
						</tr>
						<tr>
							<th scope="row">價格</th><td className="text-end">{item.price}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="row">
				{optionList}
			</div>
		</div>
	);
}

export default ItemDetail;