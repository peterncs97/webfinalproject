const Navbar = () => {
	return (
		<>
			<div className="row">
				<div className="d-flex">
					<div className="d-flex align-items-center">
						<div className="d-flex me-2">
							<h4>Apple <span className="badge bg-dark ">LV.99</span></h4>
						</div>

						<div className="d-flex flex-column">
							<div className="row align-items-center">
								<div className="col-2"><span className="badge rounded-pill bg-danger">HP</span></div>
								<div className="col-10" style={{ width: "200px" }}>
									<div className="progress">
										<div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" style={{ width: "70%" }}></div>
									</div>
								</div>
							</div>

							<div className="row align-items-center">
								<div className="col-2"><span className="badge rounded-pill bg-warning">EXP</span></div>
								<div className="col-10" style={{ width: "200px" }}>
									<div className="progress">
										<div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" style={{ width: "30%" }}></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="flex-grow-1">
						<div className="d-flex justify-content-end">
							<img className="img-fluid icon mx-2" 
								// data-bs-toggle="modal" data-bs-target="#CharacterModal" 
								src="images/equipment.svg" alt="setting" />
							<img className="img-fluid icon mx-2" src="images/book.svg" alt="setting" />
							<img className="img-fluid icon mx-2" src="images/about.svg" alt="setting" />
							<img className="img-fluid icon mx-2" src="images/achievement.svg" alt="setting" />
							<img className="img-fluid icon mx-2" src="images/setting.svg" alt="setting" />
						</div>
					</div>
				</div>
			</div>
		</>
	)
};

export default Navbar;