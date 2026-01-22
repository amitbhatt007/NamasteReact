import React, { useState, useEffect } from "react";
import "./Filter.scss";

const Filter = ({ cuisines = [], onChange }) => {
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [maxDelivery, setMaxDelivery] = useState(0);

  useEffect(() => {
    if (onChange) {
      onChange({
        search,
        cuisine,
        minRating: Number(minRating),
        maxDelivery: Number(maxDelivery),
      });
    }
  }, [search, cuisine, minRating, maxDelivery]);

  return (
    <div className="filter">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search restaurants..."
          className="search-input"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <select
        className="filter-select"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
      >
        <option value="">All Cuisines</option>
        {cuisines.map((c) => (
          <option value={c} key={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        value={minRating}
        onChange={(e) => setMinRating(e.target.value)}
      >
        <option value={0}>Any Rating</option>
        <option value={4}>4 & up</option>
        <option value={3}>3 & up</option>
        <option value={2}>2 & up</option>
      </select>

      <select
        className="filter-select"
        value={maxDelivery}
        onChange={(e) => setMaxDelivery(e.target.value)}
      >
        <option value={0}>Any Time</option>
        <option value={20}>≤ 20 mins</option>
        <option value={25}>≤ 25 mins</option>
        <option value={30}>≤ 30 mins</option>
      </select>

      <button
        className="filter-clear"
        onClick={() => {
          setSearch("");
          setCuisine("");
          setMinRating(0);
          setMaxDelivery(0);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default Filter;
