const OptionList = ({ currScene, setCurrSceneId, search, back }) => {
  const optionList = currScene.options?.filter(option => option.type !== 'monster').map((option, index) => {
    var onClick;
    switch (option.type) {
      case 'location':
      case 'battleground':
        onClick = () => setCurrSceneId(option.id); break;
      default:
        onClick = () => { };
    }
    return (
      <button type="button" key={index} onClick={onClick} className="list-group-item">{option.name}</button>
    );
  });

  if (currScene.type === "battleground" || currScene.type === "victory")
    optionList.push(
      <button type="button" key={optionList.length} onClick={search} className="list-group-item">
        索敵
      </button>);

  if (currScene.type !== "monster" && currScene.id !== 1)
    optionList.push(
      <button type="button" key={optionList.length} onClick={back} className="list-group-item">
        返回
      </button>);

  return optionList;
}

export default OptionList;



