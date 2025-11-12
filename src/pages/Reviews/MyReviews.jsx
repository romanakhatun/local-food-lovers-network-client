import PageHeader from "../../components/PageHeader";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import ReviewTable from "../../components/ReviewTable";
import Swal from "sweetalert2";

const MyReviews = () => {
  const [userReviews, setUserReviews] = useState([]);
  const { user } = useAuth();
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get(`/my-reviews?email=${user?.email}`).then((data) => {
      console.log("User data", data);
      setUserReviews(data.data);
    });
  }, [axiosInstance, user]);

  const handleDelete = (id) => {
    console.log(`Deleting review ID: ${id}`);
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
        axiosInstance.delete(`/reviews/${id}`).then((data) => {
          if (data.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Review has been deleted.",
              icon: "success",
            });

            // Remaining Data
            const remainingUserReviews = userReviews.filter(
              (review) => review._id !== id
            );
            setUserReviews(remainingUserReviews);
          }
        });
      }
    });
  };

  return (
    <div className="border-t border-black">
      <PageHeader title="My Reviews" currentPath="My Reviews" />

      <section className="py-12 md:py-20 px-4 md:px-8 container mx-auto">
        <h2 className="text-3xl font-garamond font-semibold text-base-content mb-6">
          Your Contributions ({userReviews.length})
        </h2>

        <div className="overflow-x-auto shadow-xl rounded-xl">
          <table className="table w-full">
            {/* Table Head */}
            <thead>
              <tr className="bg-neutral text-white">
                <th>Image</th>
                <th>Name</th>
                <th className="hidden sm:table-cell">Restaurant</th>
                <th className="hidden md:table-cell">Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {userReviews.map((review) => (
                <ReviewTable
                  review={review}
                  key={review._id}
                  handleDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default MyReviews;
