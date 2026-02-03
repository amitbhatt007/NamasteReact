import { useState, useEffect } from "react";
const useRestaurentMenu = (id) => {
  const [restaurentMenu, setRestaurentMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRestaurentMenu();
  }, [id]); // Re-fetch when id changes

  async function getRestaurentMenu() {
    // Skip if id is not available
    if (!id) {
      setRestaurentMenu([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await fetch(
        `http://localhost:3001/api/menu/${id}?lat=28.4798255&lng=77.0620247`
      );
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      const json = await data.json();

      // Safely get cards array
      const cards = json?.data?.cards;
      if (!Array.isArray(cards)) {
        console.warn("No cards found in API response");
        setRestaurentMenu([]);
        setLoading(false);
        return;
      }

      // Find the menu card with categories
      const menuCard = cards.find(
        (card) => card?.groupedCard?.cardGroupMap?.REGULAR?.cards
      );

      if (!menuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
        console.warn("No menu card with categories found");
        setRestaurentMenu([]);
        setLoading(false);
        return;
      }

      // Transform API categories into structured menu object
      const menuObject = {};
      menuCard.groupedCard.cardGroupMap.REGULAR.cards.forEach((card) => {
        // Check if this is a category card
        if (
          card?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) {
          const categoryTitle =
            card?.card?.card?.title?.toLowerCase().replace(/\s+/g, "_") ||
            "uncategorized";
          const items = card?.card?.card?.itemCards || [];

          // Transform items
          menuObject[categoryTitle] = items.map((itemCard) => ({
            id: itemCard?.card?.info?.id,
            name: itemCard?.card?.info?.name,
            price: itemCard?.card?.info?.price
              ? itemCard.card.info.price / 100
              : itemCard?.card?.info?.defaultPrice / 100 || 0,
            description: itemCard?.card?.info?.description || "Delicious item",
            image: itemCard?.card?.info?.imageId
              ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${itemCard.card.info.imageId}`
              : "https://via.placeholder.com/150",
            rating:
              itemCard?.card?.info?.ratings?.aggregatedRating?.rating || "4.5",
          }));
        }
      });

      setRestaurentMenu(menuObject);
    } catch (error) {
      console.error("Error fetching restaurant menu:", error);
      setError(error.message);
      setRestaurentMenu([]);
    } finally {
      setLoading(false);
    }
  }

  return { data: restaurentMenu, loading, error };
};

export default useRestaurentMenu;
