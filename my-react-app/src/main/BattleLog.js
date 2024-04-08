const BattleLog = () => {
	return (
		<section>
			<div className='p-2 overflow-auto' style={{ height: 350 }}>
				<div className="alert alert-success">
					<strong>Success!</strong> This alert box could indicate a successful or positive action.
				</div>
				<div className="alert alert-info">
					<strong>Info!</strong> This alert box could indicate a neutral informative change or action.
				</div>
				<div className="alert alert-warning">
					<strong>Warning!</strong> This alert box could indicate a warning that might need attention.
				</div>
				<div className="alert alert-danger">
					<strong>Danger!</strong> This alert box could indicate a dangerous or potentially negative action.
				</div>
				<div className="alert alert-primary">
					<strong>Primary!</strong> Indicates an important action.
				</div>
				<div className="alert alert-secondary">
					<strong>Secondary!</strong> Indicates a slightly less important action.
				</div>
				<div className="alert alert-dark">
					<strong>Dark!</strong> Dark grey alert.
				</div>
				<div className="alert alert-light">
					<strong>Light!</strong> Light grey alert.
				</div>
			</div>
		</section>
	);
}

export default BattleLog;