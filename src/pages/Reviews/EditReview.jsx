import { useState } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/FormInput";
import useAxios from "../../hooks/useAxios";
import useMessage from "../../hooks/useMessage";
import { StarRatingInput } from "../../components/StarRatingInput";
import AlertMessage from "../../components/AlertMessage";

const EditReview = () => {
  const initialReview = useLoaderData();
  const { id } = useParams();
  const [reviewData, setReviewData] = useState(initialReview || {});
  const initialRating = initialReview ? initialReview.rating : 0;
  const [rating, setRating] = useState(initialRating);
  console.log(reviewData);

  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { error, showError } = useMessage();

  // if data loading failed
  if (!initialReview) {
    return <PageHeader title="Review Not Found" currentPath="Edit" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateReview = (e) => {
    e.preventDefault();

    const updatedData = {
      ...reviewData,
      rating: rating,
      submissionDate: new Date(),
    };

    axiosInstance
      .patch(`/reviews/${id}`, updatedData)
      .then((res) => {
        navigate(`/my-reviews`);
        console.log(res.data);
      })
      .catch((err) => {
        showError("Failed to update review. Please try again.");
        console.log(err.message);
      });
  };

  return (
    <div className="border-t border-black">
      <PageHeader
        title={`Edit: ${reviewData.foodName}`}
        currentPath="Edit Review"
      />

      <div className="max-w-xl mx-auto my-15 px-4 md:px-0">
        <form onSubmit={handleUpdateReview}>
          <h3 className="font-garamond text-2xl text-base-content font-medium mb-3">
            Modify Your Review Submission
          </h3>

          <div className="space-y-5 mb-5">
            {/* Food Name */}
            <FormInput
              label="Food Name"
              type="text"
              name="foodName"
              value={reviewData.foodName || ""}
              handleChange={handleChange}
              required={true}
              placeholder="e.g., Spicy Lamb Biryani"
            />

            {/*Food Image URL */}
            <FormInput
              label="Food Image URL"
              type="url"
              name="foodImage"
              value={reviewData.foodImage || ""}
              handleChange={handleChange}
              required={true}
              placeholder="Enter direct link to the photo"
            />

            {/* Restaurant Name */}
            <FormInput
              label="Restaurant Name"
              type="text"
              name="restaurantName"
              value={reviewData.restaurantName || ""}
              handleChange={handleChange}
              required={true}
              placeholder="e.g., The Curry House"
            />

            {/* Location */}
            <FormInput
              label="Location (City/Neighborhood)"
              type="text"
              name="location"
              value={reviewData.location || ""}
              handleChange={handleChange}
              required={true}
              placeholder="e.g., Downtown, Sector 5"
            />

            {/* Star Rating */}
            <div>
              <label className="label text-sm font-semibold mb-2 block">
                Your Rating <span className="text-red-500">*</span>
              </label>
              <StarRatingInput rating={rating} setRating={setRating} />
            </div>

            {/* Review Text */}
            <div>
              <label className="label text-sm font-semibold">
                Review Text <span className="text-red-500">*</span>
              </label>
              <textarea
                name="reviewText"
                required
                rows="6"
                value={reviewData.reviewText || ""}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                placeholder="Write your detailed and honest review here..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-secondary w-full">
              Update Review
            </button>
          </div>

          {/* reusable messages */}
          <AlertMessage type="error" message={error} />
        </form>
      </div>
    </div>
  );
};

export default EditReview;
