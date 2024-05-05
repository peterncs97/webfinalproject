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
import skills from '../data/skill';

const AlwaysScrollToBottom = () => {
	const elementRef = useRef();
	useEffect(() => elementRef.current.scrollIntoView());
	return <div ref={elementRef} />;
};

const Battle = () => {
	const defaultCountDown = 10;

	const [skillId, setSkillId] = useState(0);
	const [isCountDown, setIsCountDown] = useState(false);
	const [countDown, setCountDown] = useState(defaultCountDown);
	const [battleLog, setBattleLog] = useState([{ subject: 'monster', message: '上古巨龍出現了！', type: 'danger' }]);

	useEffect(() => {
		if (countDown > 0) {
			const interval = setInterval(() => {
				setCountDown((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(interval);
		} else {
			// count down is over
			setIsCountDown(false);
			const newEntry = { subject: 'player', message: `使出${skills[skillId].name}，造成 100 點傷害！`, type: 'primary'};
			setBattleLog((prev) => [...prev, newEntry]);
		}
	}, [countDown, skillId]);

	const handleSkillUse = (id) => {
		setSkillId(id);
		setIsCountDown(true);
		setCountDown(defaultCountDown);
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
			{ isCountDown ?
				// Action state: user need to type something in a period of time  
				<>
					<BattleCountDown count={countDown} />
					<Typer spell={skills[skillId].spell} setCountDown={setCountDown} />
				</>
				: 
				// Decision state: user can choose to do something, e.g. attack, escape, uses spells... 
				<>
				<SkillBar skills={skills} handleSkillUse={handleSkillUse} isCountDown={isCountDown} />
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