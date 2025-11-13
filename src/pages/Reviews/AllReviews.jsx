import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import PageHeader from "../../components/PageHeader";
import useAxios from "../../hooks/useAxios";
import ReviewCard from "../../components/ReviewCard";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/reviews", {
        params: search ? { search } : {},
      })
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err.message);
        setLoading(false);
      });
  }, [search, axiosInstance]);

  return (
    <div className="border-t border-black">
      <PageHeader title="All Community Reviews" currentPath="All Reviews" />

      <section className="py-12 md:py-20 container mx-auto px-4">
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by food, restaurant, or reviewer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full input input-lg pl-12 pr-4 focus:outline-0"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <ReviewCard review={review} key={review._id} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AllReviews;
