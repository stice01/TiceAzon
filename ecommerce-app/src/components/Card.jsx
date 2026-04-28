import React from 'react';

function Card(props) {
  const product = props.product;
  const cartItem = props.cartItem;

  function handleAdd() {
    props.onAddToCart(product);
  }

  function handleIncrease() {
    props.onUpdateQty(cartItem.id, 1);
  }

  function handleDecrease() {
    props.onUpdateQty(cartItem.id, -1);
  }

  function handleRemove() {
    props.onRemove(cartItem.id);
  }

  let control;
  if (!cartItem) {
    control = (
      <button className="btn btn-warning mt-auto" onClick={handleAdd}>
        Add to Cart
      </button>
    );
  } else {
    let leftButton;
    if (cartItem.qty === 1) {
      leftButton = (
        <button type="button" className="btn btn-warning" onClick={handleRemove}>
          <i className="bi bi-trash"></i>
        </button>
      );
    } else {
      leftButton = (
        <button type="button" className="btn btn-warning" onClick={handleDecrease}>
          &minus;
        </button>
      );
    }

    control = (
      <div className="btn-group mt-auto" role="group">
        {leftButton}
        <button type="button" className="btn btn-warning fw-bold">
          {cartItem.qty}
        </button>
        <button type="button" className="btn btn-warning" onClick={handleIncrease}>
          +
        </button>
      </div>
    );
  }

  return (
    <div className="card h-100">
      <img src={product.image} alt={product.title} className="card-img-top" />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-muted">{product.description}</p>
        <p className="card-text fw-bold">${product.price.toFixed(2)}</p>
        {control}
      </div>
    </div>
  );
}

export default Card;
