import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import AllReviews from "../pages/Reviews/AllReviews";
import ReviewDetails from "../pages/Reviews/ReviewDetails";
import MyReviews from "../pages/Reviews/MyReviews";
import EditReview from "../pages/Reviews/EditReview";
import MyFavorites from "../pages/Favorites/MyFavorites";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import NotFound from "../pages/NotFound";
import AddReview from "../pages/Reviews/AddReview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-reviews", element: <AllReviews /> },
      {
        path: "/review/:id",
        element: <ReviewDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/reviews/${params.id}`),
      },
      {
        path: "/add-review",
        element: (
          <ProtectedRoute>
            <AddReview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-reviews",
        element: (
          <ProtectedRoute>
            <MyReviews />
          </ProtectedRoute>
        ),
      },
      {
        path: "/edit-review/:id",
        element: (
          <ProtectedRoute>
            <EditReview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-favorites",
        element: (
          <ProtectedRoute>
            <MyFavorites />
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
