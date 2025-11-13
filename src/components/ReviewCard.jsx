import { Link, useNavigate } from "react-router";
import { FaHeart, FaRegHeart, FaMapMarkerAlt } from "react-icons/fa";
import { StarRating } from "./StarRating";
import { useState } from "react";
import { GrRestaurant } from "react-icons/gr";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import { RiDeleteBin6Line } from "react-icons/ri";

const ReviewCard = ({ review, handleRemoveFavorite }) => {
  const { _id, foodName, foodImage, restaurantName, location, rating } = review;
  const [isFavorite, setIsFavorite] = useState(false);
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddFavorite = () => {
    if (!user?.email) {
      return navigate("/login");
    }

    if (isFavorite) return;
    setIsFavorite(true);

    axiosInstance
      .post("/favorites", {
        reviewId: _id,
        email: user.email,
        foodName: foodName,
        restaurantName: restaurantName,
        location: location,
        foodImage: foodImage,
        rating: rating,
      })
      .then((res) => {
        if (res.data.insertedId) {
          console.log("Added to favorites");
        } else {
          console.log("Already in favorites");
        }
      })
      .catch((err) => {
        console.log("Error:", err.message);
        setIsFavorite(false);
      });
  };

  return (
    <div className="relative group bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 pb-3">
      {handleRemoveFavorite ? (
        <button
          onClick={() => handleRemoveFavorite(_id)}
          className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow cursor-pointer"
        >
          <RiDeleteBin6Line />
        </button>
      ) : (
        <button
          onClick={handleAddFavorite}
          className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow cursor-pointer"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-xl " />
          ) : (
            <FaRegHeart className="text-black text-xl" />
          )}
        </button>
      )}

      <div className="relative overflow-hidden h-60">
        <img
          src={review.foodImage}
          alt={review.foodName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-5 text-center">
        <h3 className="text-2xl font-garamond font-semibold text-base-content mb-2">
          {review.foodName}
        </h3>

        <p className="text-base font-semibold text-gray-800 mb-1 flex items-center justify-center">
          <GrRestaurant className="text-primary" /> {review.restaurantName}
        </p>

        <p className="flex justify-center items-center gap-1 text-sm text-gray-500 mb-2">
          <FaMapMarkerAlt className="text-primary" />
          {review.location}
        </p>

        <p className="text-xs text-primary mb-3 italic">
          Reviewed by <span className="font-semibold">{review.reviewer}</span>
        </p>

        <div className="flex justify-center mb-4">
          <StarRating rating={review.rating} />
        </div>

        <Link
          to={`/review/${review._id}`}
          className="btn-primary border border-primary px-6 py-2"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ReviewCard;
