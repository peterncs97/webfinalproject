const Navbar = () => {
	return (
		<>
			<div className="row align-items-center">
				<div className="col-3 ">
					<div className="d-flex justify-content-center">
						<h4>Apple <span className="badge bg-dark ">LV.99</span></h4>
					</div>
				</div>
				<div className="col-4">
					<div className="row align-items-center">
						<div className="col-2"><span className="badge rounded-pill bg-danger">HP</span></div>
						<div className="col-10">
							<div className="progress">
								<div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" style={{ width: "70%" }}></div>
							</div>
						</div>
					</div>
					<div className="row align-items-center">
						<div className="col-2"><span className="badge rounded-pill bg-warning">EXP</span></div>
						<div className="col-10">
							<div className="progress">
								<div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" style={{ width: "30%" }}></div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-5 me-auto">
					<div className="d-flex justify-content-end">
						<img className="img-fluid icon mx-2" data-bs-toggle="modal" data-bs-target="#CharacterModal" src="images/equipment.svg" alt="setting" />
						<img className="img-fluid icon mx-2" src="images/book.svg" alt="setting" />
						<img className="img-fluid icon mx-2" src="images/about.svg" alt="setting" />
						<img className="img-fluid icon mx-2" src="images/achievement.svg" alt="setting" />
						<img className="img-fluid icon mx-2" src="images/setting.svg" alt="setting" />
					</div>
				</div>
			</div>
		</>
	)
};

export default Navbar;