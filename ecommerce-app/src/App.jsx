import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Card from './components/Card';
import ShoppingCart from './components/ShoppingCart';
import CartPreview from './components/CartPreview';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('Featured');

  // Load products (GET)
  useEffect(() => {
    fetch('/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // Load cart (GET)
  useEffect(() => {
    fetch('/cart')
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);

  // Add to cart (POST or PATCH)
  function addToCart(product) {
    let existing = null;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productId === product.id) {
        existing = cart[i];
      }
    }

    if (existing) {
      fetch('/cart/' + existing.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qty: existing.qty + 1 })
      })
        .then(res => res.json())
        .then(updated => {
          const newCart = [];
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === updated.id) {
              newCart.push(updated);
            } else {
              newCart.push(cart[i]);
            }
          }
          setCart(newCart);
          setShowPreview(true);
        });
    } else {
      const newItem = {
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        qty: 1
      };
      fetch('/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      })
        .then(res => res.json())
        .then(created => {
          setCart([...cart, created]);
          setShowPreview(true);
        });
    }
  }

  // Delete from cart (DELETE)
  function removeFromCart(id) {
    fetch('/cart/' + id, { method: 'DELETE' })
      .then(() => {
        const newCart = [];
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].id !== id) {
            newCart.push(cart[i]);
          }
        }
        setCart(newCart);
      });
  }

  // Update quantity (PATCH or DELETE)
  function updateQty(id, delta) {
    let item = null;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        item = cart[i];
      }
    }
    if (!item) return;

    const newQty = item.qty + delta;
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }

    fetch('/cart/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qty: newQty })
    })
      .then(res => res.json())
      .then(updated => {
        const newCart = [];
        for (let i = 0; i < cart.length; i++) {
          if (cart[i].id === updated.id) {
            newCart.push(updated);
          } else {
            newCart.push(cart[i]);
          }
        }
        setCart(newCart);
      });
  }

  let cartCount = 0;
  for (let i = 0; i < cart.length; i++) {
    cartCount = cartCount + cart[i].qty;
  }

  const visibleProducts = [];
  for (let i = 0; i < products.length; i++) {
    const matchesQuery = products[i].title.toLowerCase().includes(query.toLowerCase());
    const matchesTab = activeTab === 'Featured' || products[i].category === activeTab;
    if (matchesQuery && matchesTab) {
      visibleProducts.push(products[i]);
    }
  }

  function openCartPage() {
    setShowPreview(false);
    setShowCart(true);
  }

  function goBack() {
    setShowCart(false);
  }

  function closePreview() {
    setShowPreview(false);
  }

  if (showCart) {
    return (
      <div>
        <NavBar
          query={query}
          onQueryChange={setQuery}
          cartCount={cartCount}
          onCartClick={openCartPage}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="container mt-4">
          <ShoppingCart
            items={cart}
            onRemove={removeFromCart}
            onUpdateQty={updateQty}
            onBack={goBack}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar
        query={query}
        onQueryChange={setQuery}
        cartCount={cartCount}
        onCartClick={openCartPage}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="container mt-4">
        <h2 className="mb-3">{activeTab}</h2>
        <div className="row">
          {visibleProducts.map(function (p) {
            let cartItem = null;
            for (let i = 0; i < cart.length; i++) {
              if (cart[i].productId === p.id) {
                cartItem = cart[i];
              }
            }
            return (
              <div className="col-md-4 mb-4" key={p.id}>
                <Card
                  product={p}
                  cartItem={cartItem}
                  onAddToCart={addToCart}
                  onUpdateQty={updateQty}
                  onRemove={removeFromCart}
                />
              </div>
            );
          })}
        </div>
      </div>

      <CartPreview
        open={showPreview}
        items={cart}
        onClose={closePreview}
        onRemove={removeFromCart}
        onViewCart={openCartPage}
      />
    </div>
  );
}

export default App;
