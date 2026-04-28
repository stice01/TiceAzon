import React from 'react';

function CartPreview(props) {
  const items = props.items;

  let total = 0;
  let count = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price * items[i].qty;
    count = count + items[i].qty;
  }

  if (!props.open) {
    return null;
  }

  return (
    <div>
      <div className="offcanvas-backdrop fade show" onClick={props.onClose}></div>

      <div className="offcanvas offcanvas-end show">
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title">Cart ({count})</h5>
          <button type="button" className="btn-close" onClick={props.onClose}></button>
        </div>

        <div className="offcanvas-body">
          {items.length === 0 ? (
            <p className="text-muted">Your cart is empty.</p>
          ) : (
            <ul className="list-unstyled mb-0">
              {items.map(function (item) {
                return (
                  <li key={item.id} className="d-flex mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '50px', height: '50px', objectFit: 'contain', marginRight: '10px' }}
                    />
                    <div className="flex-grow-1">
                      <div className="small fw-bold">{item.title}</div>
                      <div className="small text-muted">
                        Qty {item.qty} &middot; ${(item.price * item.qty).toFixed(2)}
                      </div>
                    </div>
                    <button
                      className="btn btn-sm btn-link text-danger p-0 ms-2"
                      onClick={() => props.onRemove(item.id)}
                    >
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-top p-3">
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal</span>
            <span className="fw-bold">${total.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-warning w-100"
            onClick={props.onViewCart}
            disabled={items.length === 0}
          >
            View cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPreview;
