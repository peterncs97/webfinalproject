const OptionList = ({ currScene, setCurrSceneId, search, back, trade, event }) => {
  // Basic scene setting options
  const optionList = 
    currScene.options
      ?.filter(option => option.type !== 'monster')
      .map((option, index) => {
        var onClick;
        if (['location', 'battleground', 'trade'].includes(option.type)) 
          onClick = () => setCurrSceneId(option.id)
        else if (option.type === 'event')
          onClick = () => {
            setCurrSceneId(option.id);
            event();
          }

        return (
          <button type="button" key={index} onClick={onClick} className="list-group-item">{option.name}</button>
        );
      });

  // Extra general options
  const extraOptions = [
    { types: ['battleground', 'victory'], name: '索敵', onClick: search },
    { types: ['trade'], name: '交易', onClick: trade },
  ];

  extraOptions.forEach(option => {
    if (option.types.includes(currScene.type))
      optionList.push(
        <button type="button" key={optionList.length} onClick={option.onClick} className="list-group-item">
          {option.name}
        </button>);
  });

  // Default return option
  if (currScene.type !== "monster" && currScene.type !== 'event' && currScene.id !== 1)
    optionList.push(
      <button type="button" key={optionList.length} onClick={back} className="list-group-item">
        返回
      </button>);

  return optionList;
}

export default OptionList;



