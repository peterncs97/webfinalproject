const ItemContainer = ({ title, items, belongto, onMouseEnter, onClick  }) => {
    if (!items)
        items = [];

    const itemList = items.map((item, index) => {
        return (
            <button key={index} className="btn btn-outline-dark m-1" 
                type="button" index={index} belongto={belongto}
                onMouseEnter={onMouseEnter} onClick={onClick}>
                {item.name}
            </button>
        );
    });
    
    return (
        <div className="row justify-content-center p-2">
            <div className="row h3 mb-2 pb-1 border-bottom">
                {title}
            </div>
            <div className="d-flex align-content-start flex-wrap overflow-auto"
                style={{ height: 300 }}>
                {itemList}
            </div>
        </div>
    );
};

export default ItemContainer;