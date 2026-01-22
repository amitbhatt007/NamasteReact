import React, { useEffect, useMemo, useState } from "react";
import "./home.scss";
import RestaurentCard from "../card/restaurentCard.jsx";
import Filter from "../filter/Filter.jsx";
import Loader from "../loader/loader.jsx";
import Shimmer from "../shimmer/shimmer.jsx";

const Home = () => {
  let [apiResponse, setApiResponse] = useState([]);
  let [cards, setCards] = useState([]);

  const cuisineOptions = useMemo(() => {
    const set = new Set();
    cards?.forEach((r) => r.info.cuisines.forEach((c) => set.add(c)));
    return Array.from(set).slice(0, 20);
  }, [cards]);

  const [filters, setFilters] = useState({
    search: "",
    cuisine: "",
    minRating: 0,
    maxDelivery: 0,
  });

  const fetchData = async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.45970&lng=77.02820&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const jsonData = await response.json();
    setCards(
      jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || []
    );
    setApiResponse(jsonData);
  };

  useEffect(() => {
    // call API to fetch data
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    if (!cards) return [];
    return cards.filter((r) => {
      const avg = Number(r.info.avgRating || 0);
      const delivery = Number(r.info?.sla?.deliveryTime || 0);
      const name = r.info.name.toLowerCase();
      if (filters.search && !name.includes(filters.search.toLowerCase()))
        return false;
      if (filters.cuisine && !r.info.cuisines.includes(filters.cuisine))
        return false;
      if (filters.minRating && avg < filters.minRating) return false;
      if (filters.maxDelivery && delivery > filters.maxDelivery) return false;
      return true;
    });
  }, [cards, filters]);

  if (cards?.length === 0) {
    return <Shimmer />;
  }

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
