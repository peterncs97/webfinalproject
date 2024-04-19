const HpMpBars = ({ hp, mp }) => {
  return (
    <div className='row justify-content-center border-bottom border-3 py-2'>
      <div className="row justify-content-center align-items-center pb-1">
        <span className="col-2 badge rounded-pill bg-danger">HP</span>
        <div className="col-9">
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" style={{ width: "70%" }}></div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center align-items-center">
        <span className="col-2 badge rounded-pill bg-primary">MP</span>
        <div className="col-9">
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary" style={{ width: "70%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HpMpBars;