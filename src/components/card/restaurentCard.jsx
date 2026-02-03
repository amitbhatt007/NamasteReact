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
    <article className="restaurent-card" aria-label={restName}>
      <div className="card-image">
        {imgSrc ? (
          <img
            src={swiggyImageUrl + imgSrc}
            alt={restName}
            className="restaurent-logo"
          />
        ) : (
          <div className="image-placeholder">No image</div>
        )}

        <div className="image-overlay">
          <span className="badge rating">⭐ {rating ?? "—"}</span>
          <span className="badge time">{deliveryTime ?? ""}</span>
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{restName}</h3>
        <p className="cuisine">{cuisine}</p>

        <div className="card-footer">
          {address && <div className="meta-address">{address}</div>}
        </div>
      </div>
    </article>
  );
};

export default RestaurentCard;
