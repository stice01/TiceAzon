import React, { useState } from 'react';

function SearchBar(props) {
  const [text, setText] = useState(props.query);

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onQueryChange(text);
  }

  return (
    <form className="d-flex flex-grow-1 mx-3" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search products..."
          value={text}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-light">
          <i className="bi bi-search"></i>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
