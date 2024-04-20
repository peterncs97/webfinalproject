import { useState, useEffect, useRef } from 'react';

import BattleCountDown from '../components/BattleCountDown';
import HpMpBars from '../components/HpMpBars';
import SkillBar from '../components/SkillBar';
import Typer from '../components/Typer';
import BattleLog from '../components/BattleLog';

const AlwaysScrollToBottom = () => {
	const elementRef = useRef();
	useEffect(() => elementRef.current.scrollIntoView());
	return <div ref={elementRef} />;
};

const BattleWithShortCut = ({  }) => {
	const skills = [
		{
			id: 0,
			name: '火球',
			spell: 'Fire Ballllllllll',
		},
		{
			id: 1,
			name: '冰錐',
			spell: 'Ice Coneeeeeeeeee',
		},
		{
			id: 2,
			name: '落雷',
			spell: 'Thuder Storm',
		},
		{
			id: 3,
			name: '狂風',
			spell: 'Wind Storm',
		}
	];

	const countDown = 10;

	const [currSkillId, setCurrSkillId] = useState(null);
	const [isCountDown, setIsCountDown] = useState(false);
	const [currCountDown, setCurrCountDown] = useState(0);
	const [spell, setSpell] = useState("");
	const [battleLog, setBattleLog] = useState([
		{
			subject: 'monster',
			message: '上古巨龍出現了！',
			type: 'danger'
		}
	]);


	useEffect(() => {
		if (currSkillId === null) return;

		setSpell(skills[currSkillId].spell);
		setIsCountDown(true);
		setCurrCountDown(countDown);
	}, [currSkillId]);

	useEffect(() => {
		if (currCountDown === 0) {
			if (currSkillId === null) return;
			setBattleLog((prev) => [...prev, {
				subject: 'player',
				message: `使出${skills[currSkillId].name}，造成 100 點傷害！`,
				type: 'primary'
			}]);

			setCurrSkillId(null);
			setIsCountDown(false);
			setSpell("");
			return;
		}

		const interval = setInterval(() => {
			setCurrCountDown((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [currCountDown]);

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
					<BattleCountDown count={currCountDown} />
					<Typer spell={spell} setCurrCountDown={setCurrCountDown} />
				</>
				: <SkillBar skills={skills} setCurrSkillId={setCurrSkillId} isCountDown={isCountDown} />
			}
		</div>
	);
}

export default BattleWithShortCut;