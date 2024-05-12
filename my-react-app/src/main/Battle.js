import { useState, useEffect, useRef } from 'react';
// 	to call api
import axios from "axios";
import { api_url } from '../config';
// components
import BattleCountDown from '../components/Battle/BattleCountDown';
import HpMpBars from '../components/Battle/HpMpBars';
import SkillBar from '../components/Battle/SkillBar';
import Typer from '../components/Battle/Typer';
import BattleLog from '../components/Battle/BattleLog';

// TODO: this is temparay, need to be change to api-call format 
// import skills from '../data/skill';

const AlwaysScrollToBottom = () => {
	const elementRef = useRef();
	useEffect(() => elementRef.current.scrollIntoView());
	return <div ref={elementRef} />;
};

const Battle = () => {
	// battle 
	const [battleId, setBattleId] = useState(1); // battleid, get from (battle/create-battle) API
	const [battle, setBattle] = useState([]); // battleid, get from (battle/create-battle) API
	const [turn, setTurn] = useState(true); //true: player's turn; false: monster's turn
	const [cid, setCid] = useState(1); // user id
	const [mid, setMid] = useState(1); // monster id

	// record the skill to be use
	const [skillId, setSkillId] = useState(0);
	// record availble skill id
	const [skillIds, setSkillIds] = useState([]);
	// recorde availble skill info 
	const [skillSet, setSkillSet] = useState([]);

	// timer for action
	const defaultCountDown = 10;
	const [isCountDown, setIsCountDown] = useState(false);
	const [countDown, setCountDown] = useState(defaultCountDown);

	// need to design these log get data from backend
	const [battleLog, setBattleLog] = useState([{ subject: 'monster', message: '上古巨龍出現了！', type: 'danger' }]);

	var arr = [];

	// initialized 
	useEffect(() => {
		console.log("init");

		try {
			// get skill set
			fetch(`${api_url}/battle/get-skill-set?id=${1}`)
				.then((res) => {
					console.log("A0");
					return res.json();
				})
				.then((data) => {
					console.log("A1: " + data.data);
					setSkillIds(data.data);
				})

			// create battle
			axios.post(`${api_url}/battle/create-battle`,{}, { params: { cid: cid, mid: mid } }).
				then((res) => {
					console.log("battle"+ res.data.data);
					return res.data.data;
				}).then((data) => {
					setBattleId(data.id);
					setBattle(data);
				});

		} catch {
			console.log("something wrong in initialization");
		}
	}, []);

	// after initialized SkillIdss, get skillSet
	useEffect(() => {
		console.log("init skill set" + skillIds);
		getSkillInfo(skillIds);

	}, [skillIds]);

	// for actions
	useEffect(() => {
		console.log("actions");


		if(turn){
			console.log("player's turn");

			if (countDown > 0) {
				const interval = setInterval(() => {
					setCountDown((prev) => prev - 1);
				}, 1000);
				return () => clearInterval(interval);
			} else {
				// count down is over
				setIsCountDown(false);
				console.log("skill set in timer" + skillId);
				const newEntry = { subject: 'player', message: `使出${skillSet[skillId].name}! (${skillSet[skillId].description}) 造成 100 點傷害！`, type: 'primary' };
				setBattleLog((prev) => [...prev, newEntry]);
			}
			setTurn(false);
		}else{
			console.log("monster's turn");
			// TODO : do something to make the UI different in this state
			
			// setTurn(true);
		}
	}, [turn, countDown, skillId]);

	// for init skill set
	async function getSkillInfo(ids) {
		if (!ids) return;
		try {
			console.log("B0: getSkill, " + ids );
			for (let id of ids) {
				await axios.get(`${api_url}/battle/get-skill-info`, { params: { skillid: id } }).
					then((res) => {
						return res.data.data;
					}).
					then((data) => {
						console.log("B1" + data);
						arr.push(data);
					}).then(() => {
						console.log("B2 length" + arr.length);
					})
			}
			setSkillSet(arr);
			console.log("B3 ", arr);
		} catch {
			console.log("something wrong in getSkill");
		}
	}
	const handleSkillUse = (id) => {
		setSkillId(id);
		setIsCountDown(true);
		setCountDown(skillSet[id].timer/1000);
		
	};

	return (
		<div className='row justify-content-center border border-3'>
			{
			/* Section1: character state */}
			<div className='row border-bottom border-3'>
				<HpMpBars />
			</div>

			{/* Section2: battle log  */}
			<div className='row justify-content-center overflow-auto py-2 border-bottom border-3' style={{ height: 150 }}>
				<BattleLog battleLog={battleLog} />
				<AlwaysScrollToBottom />
			</div>

			{/* Section3: user interaction; logic: ternary condition for timeout of user skill input */}
			{isCountDown ?
				// Action state: user need to type something in a period of time  
				<>
					<BattleCountDown count={countDown} />
					<Typer skillCode={skillSet[skillId].skillCode} setCountDown={setCountDown} />
				</>
				:
				// Decision state: user can choose to do something, e.g. attack, escape, uses spells... 
				<>
					<SkillBar skills={skillSet} handleSkillUse={handleSkillUse} isCountDown={isCountDown} />
				</>
			}
		</div>
		// TODO: Battle Sub Modules
		// Design Monster Actions 
		// Design Character's Status UI
		// Design End of Battle UI

		// TODO: in Section1
		// 1. show the HP, MP digit value
		// Advance: animation for HP, MP changes  

		// TODO: in Section2
		// 1. Deal with Monster Action 

		// TODO: in Section3
		// 1. enhance readibility: use a function or a class to deal with the conditionals
		// TODO: in Section3, BattleCountDown: deal with the time limit of the mechanism 
		// 1. Early stop: Enter
		// 2. Send result to backend

		// TODO: in Section3, Type: major battle mechanism
		// 1. modify the skill Typing UI: use hint with user input log instead of following the fix prompt
		// 2. keypressHandling: Enter
		// 3. Send result to backend and update the UI 
		// TODO: in Section3, SkillBar: for showing the Actions user can interact with 
		// 1. keypressHandling: A, D, -, =
	);
}

export default Battle;