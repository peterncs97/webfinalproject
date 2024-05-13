import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Navbar = ({character}) => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("Authorization");
		if (!token) {
			navigate("/");
		}
	}, [navigate]);


	const logout = () => {
		localStorage.removeItem("Authorization");
		localStorage.removeItem("user");
		navigate("/");
	}

	if (!character) return null;
	const { currhp, currmp , maxhp, maxmp } = character.combat_attribute;
	const exp = character.experience;
	const nextLevelExp = character.nextLevelExp;
	
	return (
		<div className="row align-items-center">
			{/* Character Status */}
			<div className="col-8">
				<div className="d-flex">
					{/* Character Name and Level */}
					<div className="d-flex flex-column align-items-center me-2">
						<h4>{character.name}</h4>
						<h6><span className="badge bg-dark ">LV.{character.level}</span></h6>
					</div>
					{/* Hp, Mp, Exp Bars*/}
					<div className="d-flex flex-column">
						<div className="d-flex align-items-center mb-1">
							<span className="badge rounded-pill bg-danger me-1">HP</span>
							<div className="progress" style={{ width: "280px" }}>
								<div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" 
									style={{ width: currhp/maxhp*100+"%" }}
								>
									{currhp}/{maxhp}
								</div>
							</div>
						</div>
						<div className="d-flex align-items-center mb-1">
							<span className="badge rounded-pill bg-primary me-1">MP</span>
							<div className="progress" style={{ width: "280px" }}>
								<div className="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
									style={{ width: currmp/maxmp*100+"%" }}
								>
									{currmp}/{maxmp}
								</div>
							</div>
						</div>
						<div className="d-flex align-items-center ">
							<span className="badge rounded-pill bg-warning me-1">EXP</span>
							<div className="progress" style={{ width: "280px" }}>
								<div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" 
									style={{ width: exp/nextLevelExp*100+"%" }}
								>
									{exp}/{nextLevelExp}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Setting Icon */}
			<div className="col-4 ">
				<div className="d-flex justify-content-end">
					<button className="btn btn-outline-dark me-2" onClick={logout}>
						登出 
					</button>
				</div>
			</div>
		</div>
	)
};

export default Navbar;