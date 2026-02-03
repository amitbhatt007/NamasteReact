import React, { useState, useEffect } from "react";
import "./restaurentMenu.scss";
import { useParams } from "react-router";

const RestaurentMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});
  const [cartNotification, setCartNotification] = useState({});

  const { resId } = useParams();
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/menu/${resId}?lat=28.4798255&lng=77.0620247`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // ✅ Simply use response.json() - cleaner and safer
      const jsonData = await response.json();

      console.log("Fetched data:", jsonData); // Debug here instead

      // Parse menu data
      const cards = jsonData?.data?.cards || [];
      const menuCard = cards.find(
        (card) => card.groupedCard?.cardGroupMap?.REGULAR?.cards
      );

      if (menuCard) {
        const categories =
          menuCard.groupedCard.cardGroupMap.REGULAR.cards.filter(
            (card) =>
              card.card.card["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
          );

        const menu = {};
        categories.forEach((cat) => {
          const title = cat.card.card.title.toLowerCase().replace(/\s+/g, "");
          menu[title] = cat.card.card.itemCards.map((item) => ({
            id: item.card.info.id,
            name: item.card.info.name,
            price: item.card.info.price
              ? item.card.info.price / 100
              : item.card.info.defaultPrice / 100,
            description: item.card.info.description || "Delicious item",
            image: item.card.info.imageId
              ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.card.info.imageId}`
              : "https://via.placeholder.com/150",
          }));
        });

        setMenuData(menu);
      } else {
        console.log("No menu data found");
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
      // Fallback to sample data
      setMenuData({
        appetizers: [
          {
            id: 1,
            name: "Spring Rolls",
            price: 120,
            description: "Crispy rolls with veggies",
            image: "https://via.placeholder.com/150",
          },
        ],
        mains: [
          {
            id: 2,
            name: "Butter Chicken",
            price: 250,
            description: "Creamy tomato curry",
            image: "https://via.placeholder.com/150",
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = Object.keys(menuData);

  let filteredItems =
    selectedCategory === "all"
      ? Object.values(menuData).flat()
      : menuData[selectedCategory] || [];

  // Filter by search term
  filteredItems = filteredItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuantityChange = (itemId, quantity) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(0, quantity),
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    setCartNotification((prev) => ({
      ...prev,
      [item.id]: true,
    }));
    setTimeout(() => {
      setCartNotification((prev) => ({
        ...prev,
        [item.id]: false,
      }));
    }, 2000);
    console.log(`Added ${quantity}x ${item.name} to cart`);
    setQuantities((prev) => ({
      ...prev,
      [item.id]: 0,
    }));
  };

  if (loading) {
    return <div className="loading">Loading menu...</div>;
  }

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h1>🍽️ Restaurant Menu</h1>

        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="menu-filters">
            <label className="filters-label">
              Category
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filters-select"
              >
                <option value="all">All Items</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="no-results">
          <p>No dishes found. Try a different search!</p>
        </div>
      ) : (
        <div className="menu-items">
          {filteredItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="menu-item">
              <div className="item-image-wrapper">
                <img src={item.image} alt={item.name} />
                <div className="item-badge">New</div>
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <div className="item-footer">
                  <span className="price">₹{item.price.toFixed(2)}</span>
                  <span className="rating">⭐ 4.5</span>
                </div>

                <div className="quantity-control">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        (quantities[item.id] || 0) - 1
                      )
                    }
                  >
                    −
                  </button>
                  <span className="qty-display">
                    {quantities[item.id] || 0}
                  </span>
                  <button
                    className="qty-btn"
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        (quantities[item.id] || 0) + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="add-btn"
                  onClick={() => handleAddToCart(item)}
                  disabled={!quantities[item.id] || quantities[item.id] === 0}
                >
                  {cartNotification[item.id] ? "✓ Added!" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurentMenu;
