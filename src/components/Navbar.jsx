import { NavLink, Link } from "react-router";
import { HiOutlineBars3 } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import { BsPersonCircle } from "react-icons/bs";
import logo from "../assets/logo.svg";
import useAuth from "../hooks/useAuth";

// Define the navigation items
const navLinks = [
  { name: "Home", path: "/" },
  { name: "All Reviews", path: "/all-reviews" },
  { name: "Services", path: "/services" },
  { name: "Blog", path: "/blog" },
  { name: "Contact Us", path: "/contact" },
];
// User Dropdown Links
const userLinks = [
  { name: "Add Review", path: "/add-review" },
  { name: "My Reviews", path: "/my-reviews" },
  { name: "My Favorites", path: "/my-favorites" },
];

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const drawerId = "mobile-menu-drawer";

  const NavItem = ({ to, children }) => (
    <li>
      <NavLink
        to={to}
        onClick={() => (document.getElementById(drawerId).checked = false)}
        className={({ isActive }) =>
          `text-base font-medium text-base-content block px-[15px] py-2.3 hover:bg-primary-content rounded-lg transition-colors duration-200 ${
            isActive ? "bg-primary-content" : ""
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
                <label htmlFor={drawerId} className="cursor-pointer">
                  <HiOutlineBars3 size={35} />
                </label>
              </div>

              <Link to="/" className="ml-1 lg:ml-0 order-2">
                <img className="max-h-10" src={logo} alt="Logo" />
              </Link>
            </div>

            {/* Desktop Menu */}
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
              {/* dropdown trigger */}
              {user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="cursor-pointer m-1"
                  >
                    {user?.photoURL ? (
                      <img
                        className="aspect-square object-cover rounded-full h-12 border-5 border-[#dfdfdf]"
                        src={user.photoURL}
                        alt="photo"
                      />
                    ) : (
                      <BsPersonCircle size={40} />
                    )}
                  </div>

                  {/* dropdown content */}
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-white rounded-box z-10 w-52 px-2 py-4 border shadow-lg flex flex-col gap-1"
                  >
                    {userLinks.map((link) => (
                      <li key={link.name}>
                        <NavLink
                          to={link.path}
                          className={({ isActive }) =>
                            `text-base-content block px-[15px] py-2.3 hover:bg-primary-content rounded-lg transition-colors duration-200 ${
                              isActive ? "bg-primary-content" : ""
                            }`
                          }
                        >
                          {link.name}
                        </NavLink>
                      </li>
                    ))}
                    <span
                      className="py-2 cursor-pointer border rounded-xl text-center"
                      onClick={() => signOutUser()}
                    >
                      Log out
                    </span>
                  </ul>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn-primary  px-[19px] py-2 border-0"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary px-[19px] py-2 border-0"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="drawer-side bg-white w-screen md:w-[50vw] z-50">
        <label
          htmlFor={drawerId}
          aria-label="close sidebar"
          className=""
        ></label>

        <ul className="menu p-4 w-screen md:w-[50vw] min-h-full text-base-content">
          <div className="flex justify-start mb-4">
            <label htmlFor={drawerId} className="btn btn-ghost btn-circle">
              <TfiClose size={25} className="text-black" />
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
