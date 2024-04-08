const Backpack = ({ items, onMouseEnter  }) => {
    if (!items)
        items = [];

    const itemList = items.map((item, index) => {
        return (
            <button key={index} className="btn btn-outline-dark m-1" data={index} onMouseEnter={onMouseEnter} type="button">{item.name}</button>
        );
    });
    
    return (
        <div className="d-flex align-content-start flex-wrap rounded border border-3 overflow-auto"
            style={{ height: 400 }}>
            {itemList}
        </div>
    );
};

export default Backpack;