const Item = ({item}) => {
	if (!item)
		item = { id: 0, name: '/', description: '', type: '/', atk: 0, def: 0, effect: '/', price: 0 };
	
	return (
		<div className="row justify-content-center rounded border border-3 p-2">
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
							<th scope="row">種類</th><td className="text-end">{item.type}</td>
						</tr>
						<tr>
							<th scope="row">ATK</th><td className="text-end">{item.atk}</td>
						</tr>
						<tr>
							<th scope="row">DEF</th><td className="text-end">{item.def}</td>
						</tr>
						<tr>
							<th scope="row">效果</th><td className="text-end">{item.effect}</td>
						</tr>
						<tr>
							<th scope="row">價格</th><td className="text-end">{item.price}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="row">
				<button className="btn btn-dark mb-2" type="button">裝備</button>
				<button className="btn btn-dark" type="button">使用</button>
			</div>
		</div>
	);
}

export default Item;