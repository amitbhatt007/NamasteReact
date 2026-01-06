import { swiggyImageUrl } from "../../utils/constant";
import "./restaurentCard.scss";
const RestaurentCard = ({
  restName,
  cuisine,
  rating,
  imgSrc,
  deliveryTime,
  address,
}) => {
  return (
    <div className="restaurent-card">
      {imgSrc && (
        <img
          src={swiggyImageUrl + imgSrc}
          alt="restaurent-logo"
          className="restaurent-logo"
        />
      )}
      <h3>{restName}</h3>
      <p>{cuisine}</p>
      <div className="card-meta">
        <span className="meta-rating">⭐ {rating ?? "—"}</span>
        <span className="meta-time">{deliveryTime ?? ""}</span>
      </div>
      {address && <p className="meta-address">{address}</p>}
    </div>
  );
};

export default RestaurentCard;
