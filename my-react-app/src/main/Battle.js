import { useState, useEffect } from 'react';
import BattleCountDown from '../components/BattleCountDown';
import HpMpBars from '../components/HpMpBars';


const Battle = ({ setCurrSceneId }) => {
	const log = [
		{
			subject: 'monster',
			message: '上古巨龍出現了！',
			type: 'danger'
		},
		{
			subject: 'player',
			message: 'Apple使出普通攻撃！上古巨龍受到26點傷害！',
			type: 'success'
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

	const skills = [
		{
			id: 0,
			name: '火球術',
			spell: 'Fire Ballllllllll',
		},
		{
			id: 1,
			name: '冰錐術',
			spell: 'Ice Coneeeeeeeeee',
		}
	];
	
	const countDown = 5;

	const [currSkillId, setCurrSkillId] = useState(null);
	const [currSkill, setCurrSkill] = useState(null);

	const [currCountDown, setCurrCountDown] = useState(0);
	const [countDownOpacity, setCountDownOpacity] = useState(false);

	const [spellPlaceholder, setSpellPlaceholder] = useState("");

	useEffect(() => {
		if (currSkillId === null) return;

		setCurrSkill(skills[currSkillId]);
		setSpellPlaceholder(skills[currSkillId].spell);
		setCountDownOpacity(true);
		setCurrCountDown(countDown);
	}, [currSkillId]);
	
	useEffect(() => {
		if (currCountDown === 0){
			setCurrSkillId(null);
			setCurrSkill(null);
			setCountDownOpacity(false);
			setSpellPlaceholder("");
			return;
		}
		
		const interval = setInterval(() => {
			setCurrCountDown((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [currCountDown]);

	const entryList = log.map((entry, index) => {
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
		<div className='row border border-3'>
			<div className='col-9'>
				
				
				<div className='row overflow-auto mb-2 p-2 border-bottom border-3' style={{ height: 200 }}>
					{entryList}
				</div>

				<BattleCountDown count={currCountDown} opacity={countDownOpacity}/>
				<div className="row justify-content-center align-items-center pb-2">
					
					<div className="form">
						<input type="text" className="form-control form-control-lg text-center mb-2" id="" placeholder={spellPlaceholder} disabled />
						<input ref={input => input && input.focus()} type="text" className="form-control form-control-lg text-center" id="" placeholder="" />
					</div>
				</div>
			</div>
			
			<div className='col-3 border-start border-3'>
				<HpMpBars />
				<div className="accordion accordion-flush py-1" id="accordionFlushExample">

					<div className="accordion-item">
						<h2 className="accordion-header" id="flush-heading1">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse1" aria-expanded="false" aria-controls="flush-collapse1">
								技能
							</button>
						</h2>
						<div id="flush-collapse1" className="accordion-collapse collapse" aria-labelledby="flush-heading1" data-bs-parent="#accordionFlushExample">
							<div className="accordion-body">
								<ul class="list-group">
									<li class="list-group-item" onClick={() => setCurrSkillId(0)}>{skills[0].name}</li>
									<li class="list-group-item" onClick={() => setCurrSkillId(1)}>{skills[1].name}</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="flush-heading2">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse2" aria-expanded="false" aria-controls="flush-collapse2">
								道具
							</button>
						</h2>
						<div id="flush-collapse2" className="accordion-collapse collapse" aria-labelledby="flush-heading2" data-bs-parent="#accordionFlushExample">
							<div className="accordion-body">
								<ul class="list-group">
									<li class="list-group-item">An item</li>
									<li class="list-group-item">A second item</li>
									<li class="list-group-item">A third item</li>
									<li class="list-group-item">A fourth item</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="accordion-item">
						<h2 className="accordion-header" id="flush-heading3">
							<button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse3" aria-expanded="false" aria-controls="flush-collapse3">
								逃跑
							</button>
						</h2>
						<div id="flush-collapse3" className="accordion-collapse collapse" aria-labelledby="flush-heading3" data-bs-parent="#accordionFlushExample">

						</div>
					</div>

				</div>
			</div>
			
		</div>
	);
}

export default Battle;