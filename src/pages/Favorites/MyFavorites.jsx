import { useState, useEffect } from "react";
import { Link } from "react-router";
import PageHeader from "../../components/PageHeader";
import ReviewCard from "../../components/ReviewCard";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const MyFavorites = () => {
  const [favoriteReviews, setFavoriteReviews] = useState([]);
  const { user } = useAuth();
  const axiosInstance = useAxios();

  // Load Favorite Reviews
  useEffect(() => {
    if (!user?.email) {
      return;
    }
    axiosInstance
      .get(`/favorites?email=${user.email}`)
      .then((res) => setFavoriteReviews(res.data))
      .catch((err) => console.log("Failed to fetch favorite reviews:", err));
  }, [user?.email, axiosInstance]);

  // Remove Favorite Reviews
  const handleRemoveFavorite = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`/favorites/${id}`).then((data) => {
          if (data.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Favorite Review has been deleted.",
              icon: "success",
            });

            // Remaining Data
            const remainingFavoriteReviews = favoriteReviews.filter(
              (review) => review._id !== id
            );
            setFavoriteReviews(remainingFavoriteReviews);
          }
        });
      }
    });
  };

  return (
    <div className="border-t border-black">
      <PageHeader title="My Favorites" currentPath="My Favorites" />

      <section className="py-12 md:py-20 container mx-auto px-4">
        <h2 className="text-3xl font-garamond font-semibold text-base-content mb-8">
          My Curated Favorites ({favoriteReviews.length})
        </h2>

        {favoriteReviews.length === 0 ? (
          <div className="text-center py-10 bg-gray-50 rounded-xl shadow-inner">
            <p className="text-xl text-gray-600 mb-4">
              You haven't added any reviews to your favorites yet.
            </p>
            <Link to="/all-reviews" className="btn-primary px-5 py-2">
              Explore Reviews Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteReviews.map((review) => (
              <ReviewCard
                review={review}
                key={review._id}
                handleRemoveFavorite={handleRemoveFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MyFavorites;
