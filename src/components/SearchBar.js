import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query, category);
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search artist, team, show, or venue..."
        />
        <select
          className="search-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Music</option>
          <option>Sports</option>
          <option>Arts & Theatre</option>
          <option>Comedy</option>
        </select>
        <button className="search-btn" type="submit" disabled={loading}>
          {loading ? 'Searching...' : '✦ Search'}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;