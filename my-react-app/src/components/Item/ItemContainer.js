import Button from 'react-bootstrap/Button';
import { GrMoney } from "react-icons/gr";
const ItemContainer = ({ title, items, money, belongto, onMouseEnter, setSplitModalShow }) => {
  if (!items)
    items = [];

  const itemList = items.map((item, index) => {
    // Display item quantity if the item belongs to the character
    const text = (belongto === 'character') ? `${item.name} x ${item.item_ownership.quantity}` : item.name;
    return (
      <Button key={index} variant="outline-dark m-1"
        index={index} belongto={belongto}
        onMouseEnter={onMouseEnter}
        onClick={() => {
          // setSplitModalShow is for trading item split modal
          if (typeof setSplitModalShow == 'function')
            setSplitModalShow(true);
        }}
      >
        {item.name} {(belongto === 'character') ? <span className="badge bg-dark"> x{item.item_ownership.quantity}</span> : null}
      </Button>
    );
  });

  return (
    <>
      <div className="row justify-content-center p-2">
        <div className="row h3 mb-2 pb-1 border-bottom">
          <div className='d-flex justify-content-between'>
            {title}
            {
              (belongto === 'character') ?
                <span><GrMoney /> {money}</span> : null
            }
          </div>
        </div>
        <div className="d-flex align-content-start flex-wrap overflow-auto"
          style={{ height: 250 }}>
          {itemList}
        </div>
      </div>
    </>
  );
};

export default ItemContainer;