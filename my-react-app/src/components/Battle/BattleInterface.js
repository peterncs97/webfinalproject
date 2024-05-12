import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import BattleCountDown from './BattleCountDown';
import HpMpBars from './HpMpBars';
import SkillBar from './SkillBar';
import Typer from './Typer';
import BattleLog from './BattleLog';

const AlwaysScrollToBottom = () => {
	const elementRef = useRef();
	useEffect(() => elementRef.current.scrollIntoView());
	return <div ref={elementRef} />;
};

const BattleInterface = ({ battle, monster, skills, battleStatus, setBattleStatus, setBattle, setResult }) => {
	const navigate = useNavigate();
	
	const [battleLog, setBattleLog] = useState([{ subject: 'monster', message: `${monster.name}出現了！`, type: 'danger' }]); // Initial battle log
	const [skill, setSkill] = useState(null); // Skill Bar
	const [text, setText] = useState(''); // User Skill Code Input in typer
	
	// Timer for code typing
	const [isCountDown, setIsCountDown] = useState(false);
	const [countDown, setCountDown] = useState(10);

	useEffect(() => {
		if (isCountDown && countDown > 0) {
			const interval = setInterval(() => {
				setCountDown((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(interval);
		} else if (isCountDown && countDown === 0) {
			// count down is over
			updateBattle();
		}
	}, [countDown, skill]);

	const updateBattle = () => {
		axios.post(`/battle/update`, { battleId: battle.id, skillId: skill.id, userInput: text, remainingTime: countDown })
			.then((response) => {
				const { battleStatus, battle, playerDamage, monsterDamage, result } = response.data.data;
				setBattleStatus(battleStatus);
				setBattle(battle);
				updateBattleLog(battleStatus, playerDamage, monsterDamage);
				if (battleStatus === 'win')
					setResult(result);
			}).catch((error) => {
				console.error(error);
			});

		setText('');
		setCountDown(10);
		setIsCountDown(false);
	}

	const updateBattleLog = (battleStatus, playerDamage, monsterDamage) => {
		var newEntries = [];
		const playerEntry = { subject: 'player', message: `使出${skill.name}！對${monster.name}造成 ${playerDamage} 點傷害！`, type: 'primary' };
		newEntries.push(playerEntry);

		if (battleStatus === 'win') {
			const victoryEntry = { subject: 'player', message: `${monster.name}被擊敗了！`, type: 'success' };
			newEntries.push(victoryEntry);
		} 
		else if (battleStatus === 'continue') {
			const monsterEntry = { subject: 'monster', message: `怪物對你造成 ${monsterDamage} 點傷害！`, type: 'danger' };
			newEntries.push(monsterEntry);
		}
		else if (battleStatus === 'lose') {
			const monsterEntry = { subject: 'monster', message: `怪物使出造成 ${monsterDamage} 點傷害！`, type: 'danger' };
			const defeatEntry = { subject: 'player', message: `你被${monster.name}擊敗了！`, type: 'danger' };
			newEntries.push(monsterEntry);
			newEntries.push(defeatEntry);
		}
		setBattleLog([...battleLog, ...newEntries]);
	}

	const handleSkillUse = (id) => {
		setSkill(skills[id])
		setIsCountDown(true);
		setCountDown(skills[id].timer/1000);
	};

	const handleEscape = () => {
		axios.post(`/battle/escape`, { battleId: battle.id })
		.then((response) => {
			navigate("/main");
		}).catch((error) => {
			console.error(error);
		});
	}

	return (
		<div className='row justify-content-center border border-3'>
			{/* Battle log  */}
			<div className='row justify-content-center overflow-auto py-2 border-bottom border-3' style={{ height: 200 }}>
				<BattleLog battleLog={battleLog} />
				<AlwaysScrollToBottom />
			</div>
			{/* Character state */}
			<div className='row py-2 border-bottom border-3'>
				<HpMpBars currhp={battle.CharacterHP} currmp={battle.CharacterMP} maxhp={battle.CharacterMAXHP} maxmp={battle.CharacterMAXMP} />
			</div>
			{/* Section3: user interaction; logic: ternary condition for timeout of user skill input */}
			{isCountDown ?
				// Action state: user need to type something in a period of time  
				<>
					<BattleCountDown count={countDown} />
					<Typer text={text} setText={setText} skillCode={skill.skillCode} setCountDown={setCountDown} />
				</>
				:
				// Decision state: user can choose to do something, e.g. attack, escape, uses spells... 
				<SkillBar skills={skills} handleSkillUse={handleSkillUse} handleEscape={handleEscape} isCountDown={isCountDown} battleStatus={battleStatus} currmp={battle.CharacterMP}/>
			}
			
		</div>
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

export default BattleInterface;