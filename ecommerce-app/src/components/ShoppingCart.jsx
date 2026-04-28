import React from 'react';

function ShoppingCart(props) {
  const items = props.items;

  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price * items[i].qty;
  }

  if (items.length === 0) {
    return (
      <div>
        <button className="btn btn-link ps-0 mb-2" onClick={props.onBack}>
          &larr; Continue shopping
        </button>
        <h2>Your Cart</h2>
        <p className="text-muted">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <button className="btn btn-link ps-0 mb-2" onClick={props.onBack}>
        &larr; Continue shopping
      </button>
      <h2>Your Cart</h2>

      <ul className="list-group mb-3">
        {items.map(function (item) {
          return (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '60px', marginRight: '15px' }}
                />
                <div>
                  <div className="fw-bold">{item.title}</div>
                  <div>${item.price.toFixed(2)}</div>
                </div>
              </div>

              <div className="d-flex align-items-center">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => props.onUpdateQty(item.id, -1)}
                >
                  -
                </button>
                <span className="mx-2">{item.qty}</span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => props.onUpdateQty(item.id, 1)}
                >
                  +
                </button>
                <button
                  className="btn btn-sm btn-danger ms-3"
                  onClick={() => props.onRemove(item.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <h4>Total: ${total.toFixed(2)}</h4>
    </div>
  );
}

export default ShoppingCart;
