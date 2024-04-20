import { useState, useEffect, useRef } from 'react';

import BattleCountDown from '../components/Battle/BattleCountDown';
import HpMpBars from '../components/Battle/HpMpBars';
import SkillBar from '../components/Battle/SkillBar';
import Typer from '../components/Battle/Typer';
import BattleLog from '../components/Battle/BattleLog';

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
			<div className='row border-bottom border-3'>
				<HpMpBars />
			</div>
			<div className='row justify-content-center overflow-auto py-2 border-bottom border-3' style={{ height: 150 }}>
				<BattleLog battleLog={battleLog} />
				<AlwaysScrollToBottom />
			</div>
			{isCountDown ?
				<>
					<BattleCountDown count={countDown} />
					<Typer spell={skills[skillId].spell} setCountDown={setCountDown} />
				</>
				: <SkillBar skills={skills} handleSkillUse={handleSkillUse} isCountDown={isCountDown} />
			}
		</div>
	);
}

export default Battle;