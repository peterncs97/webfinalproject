const HpMpBars = ({ currhp, currmp, maxhp, maxmp }) => {
  return (
    <div className='row justify-content-center py-2'>
      <div className="row justify-content-center align-items-center pb-1">
        <span className="col-2 badge rounded-pill bg-danger">HP</span>
        <div className="col-9">
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" style={{ width: currhp / maxhp * 100 + '%' }}>{currhp} / {maxhp}</div>
          </div>
        </div>
      </div>
      {
      (maxmp) && 
        <div className="row justify-content-center align-items-center">
          <span className="col-2 badge rounded-pill bg-primary">MP</span>
          <div className="col-9">
            <div className="progress">
              <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary" style={{ width: currmp / maxmp * 100 + '%' }}>{currmp} / {maxmp}</div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default HpMpBars;