import React from 'react';
import SearchBar from './SearchBar';

function NavBar(props) {
  const tabs = ['Featured', 'Clothes', 'Tech', 'Decor', 'School'];

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand fw-bold">TiceAzon</span>

        <SearchBar query={props.query} onQueryChange={props.onQueryChange} />

        <button className="btn btn-outline-light" onClick={props.onCartClick}>
          Cart ({props.cartCount})
        </button>
      </nav>

      <div className="bg-dark pb-2">
        <div className="container">
          {tabs.map(function (t) {
            const isActive = props.activeTab === t;
            return (
              <button
                key={t}
                className={'btn btn-link text-decoration-none ps-0 me-4 ' + (isActive ? 'text-white fw-bold' : 'text-white-50')}
                onClick={() => props.onTabChange(t)}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
