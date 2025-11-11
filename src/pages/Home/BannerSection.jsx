import { Link } from "react-router";
import HeroBg from "../../assets/slider-bg03.jpg";

const BannerSection = () => {
  return (
    <div
      className="relative min-h-[90vh] flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.9) 45%, rgba(0, 0, 0, 0) 100%)",
        }}
      ></div>

      <div className="z-10">
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-6 p-8 md:p-12 lg:p-16">
            <p className="text-primary-content text-sm font-semibold mb-2 tracking-widest uppercase">
              IT'S FREE TO JOIN THE NETWORK!
            </p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-white mb-6 leading-tight  font-garamond font-medium">
              Find Your Next Favorite Local Bite.
            </h1>

            <p className="text-base text-gray-300 mb-8 max-w-lg">
              Join a network of foodies. Post honest reviews, share great
              photos, and discover local favorites near you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="btn-primary text-center px-6 py-3 border-0"
              >
                Sign Up Free
              </Link>

              <Link
                to="/reviews"
                className="border border-white hover:bg-primary hover:border-primary text-white px-6 py-2 rounded-lg text-center transition-colors duration-200 flex items-center justify-center"
              >
                Explore Reviews
              </Link>
            </div>
          </div>

          {/* Right Side: Image is fully visible here, gradually fading to dark on the left */}
          <div className="col-span-12 lg:col-span-7 hidden lg:block"></div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
