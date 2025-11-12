import { FaEdit, FaTrash } from "react-icons/fa";
const ReviewTable = ({ review, handleDelete }) => {
  const handleEdit = (id) => {
    console.log(`Editing review ID: ${id}`);
  };

  const formattedDate = new Date(review.submissionDate).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );
  return (
    <tr className="hover:bg-gray-50 border-b border-gray-200">
      {/* Image */}
      <td>
        <div className="avatar">
          <div className="w-12 h-12 rounded-lg">
            <img
              src={review.foodImage}
              alt={review.foodName}
              className="object-cover"
            />
          </div>
        </div>
      </td>

      {/*  Name & Restaurant  */}
      <td>
        <span className="font-semibold text-base-content">
          {review.reviewer}
        </span>

        <span className="block text-xs text-gray-500 sm:hidden">
          @{review.restaurantName}
        </span>
      </td>

      {/* Restaurant Hidden on small screens */}
      <td className="hidden sm:table-cell text-gray-700">
        {review.restaurantName}
      </td>

      {/* Date (Hidden on medium screens) */}
      <td className="hidden md:table-cell text-sm text-gray-500">
        {formattedDate}
      </td>

      {/* Edit Button */}
      <td>
        <button
          onClick={() => handleEdit(review._id)}
          className="cursor-pointer text-secondary hover:text-secondary-focus"
          title="Edit Review"
        >
          <FaEdit size={16} />
        </button>
      </td>

      {/* Delete Button */}
      <td>
        <button
          onClick={() => handleDelete(review._id)}
          className="cursor-pointer text-red-500 hover:text-red-700"
          title="Delete Review"
        >
          <FaTrash size={16} />
        </button>
      </td>
    </tr>
  );
};

export default ReviewTable;
