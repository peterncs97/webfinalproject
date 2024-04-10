import { useState, useEffect } from 'react';

const BattleLog = ({ setCurrSceneId }) => {
	const log = [
		{
			subject: 'monster',
			message: '上古巨龍出現了！',
			type: 'danger'
		},
		{
			subject : 'player',
			message: 'Apple使出普通攻撃！上古巨龍受到26點傷害！',
			type : 'success'
		},
		{
			subject: 'monster',
			message: '上古巨龍使出普通攻撃！Apple受到40點傷害！',
			type: 'danger'
		},
		{
			subject: 'player',
			message: 'Apple使出突刺！上古巨龍受到30點傷害！',
			type: 'success'
		},
		{
			subject: 'player',
			message: 'Apple使出普通攻撃！上古巨龍受到20點傷害！',
			type: 'success'
		},
		{
			subject: 'monster',
			message: '上古巨龍使出噴火！Apple受到100點傷害！',
			type: 'danger'
		},
		{
			subject: 'player',
			message: 'Apple使出會心一擊！上古巨龍受到153點傷害！',
			type: 'success'
		},
		{
			subject: 'monster',
			message: '上古巨龍力竭。戰鬥結束。',
			type: 'danger'
		},
		{
			subject: 'player',
			message: '戰鬥獲勝！！！！！！',
			type: 'warning'
		},
	];

	const [count, setCount] = useState(0);
	const [entries, setEntries] = useState([]);

	useEffect(() => {
		if (count >= log.length) {
			setCurrSceneId(101); // victory scene
			return;
		}
		const interval = setInterval(() => {
			setEntries((prevList) => [log[count], ...prevList]);
			setCount((prevcount) => prevcount + 1);
		}, 700);

		return () => clearInterval(interval);
	}, [count]);
	
	const entryList = entries.map((entry, index) => {
		var justify = (entry.subject !== 'player') ? 'end' : 'start'; 
		return (
			<div className={`d-flex justify-content-${justify}`}>
				<div className={`alert alert-${entry.type}`} style={{ display: "inline-block" }}>
					{entry.message}
				</div >
			</div>
			
		);
	}); 

	return (
		<section>
			<div className='p-2 overflow-auto' style={{ height: 350 }}>
				{entryList}
			</div>
		</section>
	);
}

export default BattleLog;