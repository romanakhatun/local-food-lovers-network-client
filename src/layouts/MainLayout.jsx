import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsletterSection from "../components/NewsletterSection";

const MainLayout = () => {
  return (
    <div>
      <div className="bg-white">
        <div className="max-w-11/12 lg:px-2 py-2 mx-auto">
          <Navbar />
        </div>
      </div>
      <div className="min-h-screen">
        <Outlet />
      </div>

      <div className="mt-12">
        <NewsletterSection />
        <div className="bg-neutral">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
