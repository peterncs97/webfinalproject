const Typer = ({ spell }) => {
  return (
    <div className="row justify-content-center align-items-center pb-2">
      <div className="form">
        <input type="text" className="form-control form-control-lg text-center mb-2" id="" placeholder={spell} disabled />
        <input ref={input => input && input.focus()} type="text" 
          className="form-control form-control-lg text-center" id="" 
          placeholder="詠唱咒文！" />
      </div>
    </div>
  );
}

export default Typer;