import React, { useMemo, useState } from "react";
import "./home.scss";
import { sampleData } from "../../../sample-data";
import RestaurentCard from "../card/restaurentCard.jsx";
import Filter from "../filter/Filter.jsx";

const Home = () => {
  let { data } = sampleData;
  let cards =
    data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

  const cuisineOptions = useMemo(() => {
    const set = new Set();
    cards?.forEach((r) => r.info.cuisines.forEach((c) => set.add(c)));
    return Array.from(set).slice(0, 20);
  }, [cards]);

  const [filters, setFilters] = useState({
    cuisine: "",
    minRating: 0,
    maxDelivery: 0,
  });

  const filtered = useMemo(() => {
    if (!cards) return [];
    return cards.filter((r) => {
      const avg = Number(r.info.avgRating || 0);
      const delivery = Number(r.info?.sla?.deliveryTime || 0);
      if (filters.cuisine && !r.info.cuisines.includes(filters.cuisine))
        return false;
      if (filters.minRating && avg < filters.minRating) return false;
      if (filters.maxDelivery && delivery > filters.maxDelivery) return false;
      return true;
    });
  }, [cards, filters]);

  return (
    <div className="main-container">
      <Filter cuisines={cuisineOptions} onChange={(f) => setFilters(f)} />
      <div className="restaurent-list">
        {filtered?.map((restaurant) => (
          <RestaurentCard
            key={restaurant.info.id}
            restName={restaurant.info.name}
            cuisine={restaurant.info.cuisines.join(", ")}
            rating={
              restaurant.info.avgRatingString || restaurant.info.avgRating
            }
            imgSrc={restaurant.info.cloudinaryImageId}
            deliveryTime={restaurant.info?.sla?.slaString}
            address={restaurant.info?.areaName || restaurant.info?.locality}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
