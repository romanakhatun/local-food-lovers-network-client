import { NavLink, Link } from "react-router";
import logo from "../assets/logo.svg";
import { HiOutlineBars3 } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";

// Define the navigation items
const navLinks = [
  { name: "Home", path: "/" },
  { name: "All Reviews", path: "/all-reviews" },
  { name: "Services", path: "/services" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const drawerId = "mobile-menu-drawer";

  const NavItem = ({ to, children }) => (
    <li>
      <NavLink
        to={to}
        onClick={() => (document.getElementById(drawerId).checked = false)}
        className={({ isActive }) =>
          `text-[15px] font-medium text-base-content block px-4 py-3 hover:bg-secondary-content rounded-lg transition-colors duration-200 ${
            isActive ? "text-primary font-semibold" : ""
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );

  return (
    <div className="drawer drawer-start lg:drawer-end">
      <input id={drawerId} type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <div className="sticky top-0 z-40">
          <div className="navbar">
            <div className="navbar-start">
              <div className="order-1 lg:hidden">
                <label htmlFor={drawerId} className="btn btn-ghost">
                  <HiOutlineBars3 size={35} className="" />
                </label>
              </div>

              <Link to="/" className="ml-4 lg:ml-0 order-2">
                <img className="max-h-10" src={logo} alt="Logo" />
              </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal gap-2">
                {navLinks.map((link) => (
                  <NavItem key={link.name} to={link.path}>
                    {link.name}
                  </NavItem>
                ))}
              </ul>
            </div>

            <div className="navbar-end flex gap-3">
              <Link to="/login" className="btn-primary border-0">
                Login
              </Link>
              <Link to="/register" className="btn-primary border-0">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="drawer-side z-50">
        <label
          htmlFor={drawerId}
          aria-label="close sidebar"
          className="drawer-overlay sm:w-screen md:w-[50vw]"
        ></label>

        <ul className="menu p-4 sm:w-screen md:w-[50vw] min-h-full text-base-content">
          <div className="flex justify-end mb-4">
            <label htmlFor={drawerId} className="btn btn-ghost btn-circle">
              <TfiClose size={25} />
            </label>
          </div>

          {navLinks.map((link) => (
            <NavItem key={`mobile-${link.name}`} to={link.path}>
              {link.name}
            </NavItem>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
