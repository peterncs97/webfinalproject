const BattleLog = ({ battleLog }) => {
	const entryList = battleLog?.map((entry, index) => {
		var justify = (entry.subject !== 'player') ? 'start' : 'end'; 
		return (
			<div className={`d-flex justify-content-${justify} align-items-start`}>
				<div className={`alert alert-${entry.type}`} style={{ display: "inline-block" }}>
					{entry.message}
				</div>
			</div>
		);
	}); 

	return (
		<>
			{entryList}
		</>
	);
}

export default BattleLog;