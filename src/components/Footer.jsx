import { Link } from "react-router";
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import logo from "../assets/logo.svg";

// Define the navigation items
const navLinks = [
  { name: "Home", path: "/" },
  { name: "All Reviews", path: "/all-reviews" },
  { name: "Services", path: "/services" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];

const reviewCategories = [
  "Restaurant Reviews",
  "Café & Coffee Shops",
  "Desserts & Bakeries",
  "Street Food Hubs",
];

const socialLinks = [
  { Icon: RiTwitterXFill, href: "https://www.twitter.com" },
  { Icon: FaFacebookF, href: "https://www.facebook.com" },
  { Icon: FaLinkedinIn, href: "https://www.linkedin.com" },
  { Icon: FaPinterestP, href: "https://www.pinterest.com" },
];

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="link link-hover text-sm py-1 transition-colors duration-200"
  >
    {children}
  </Link>
);

const Footer = () => {
  return (
    <footer className="pt-16 pb-6 mt-12 text-base-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:pr-10">
            <div className="flex items-center gap-2 mb-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-2xl font-bold font-garamond text-primary ml-4 lg:ml-0 order-2"
              >
                <img className="max-h-10" src={logo} alt="Logo" />
              </Link>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Discover and share the best dining experiences in your city. From
              hidden gems to local favorites, we've got the scoop.
            </p>

            {/* Social Links */}
            <div>
              <p>Connect with us:</p>
              <div className="flex space-x-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    className="social-icon"
                  >
                    <link.Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-heading font-garamond">Quick Links</h3>
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <FooterLink key={link.name} to={link.path}>
                  {link.name}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Unique Section: Review Categories */}
          <div>
            <h3 className="footer-heading font-garamond">
              Top Review Categories
            </h3>
            <nav className="flex flex-col">
              {reviewCategories.map((category, index) => (
                // Use '#' or relevant search path for these links
                <FooterLink
                  key={index}
                  to={`/category/${category
                    .toLowerCase()
                    .replace(/ & /g, "-")
                    .replace(/ /g, "-")}`}
                >
                  {category}
                </FooterLink>
              ))}
            </nav>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="footer-heading font-garamond">Contact Us</h3>
            <div className="flex flex-col space-y-3 text-sm">
              <p>
                <span className="font-semibold">Location:</span> 76/A, Green
                Lane, Dhanmondi, NYC
              </p>
              <a
                href="tel:+010215458777"
                className="text-lg text-white hover:underline"
              >
                +01 0215 458 777
              </a>
              <p className="pt-2">proromana2004@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Copyright Section --- */}
      <div className="text-center text-xs mt-12 pt-6 border-t border-gray-600">
        Copyright ©{new Date().getFullYear()} BiteHub. All rights reserved
        Designed by{" "}
        <Link to="https://github.com/romanakhatun/" className="underline">
          Romana
        </Link>
        .
      </div>
    </footer>
  );
};

export default Footer;
