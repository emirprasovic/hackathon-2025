import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="pb-6 bg-white-50 shadow-lg lg:pb-0">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex">
              <img
                className="w-auto h-9 lg:h-11"
                src="../../images/logo.png"
                alt="logo"
              />
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            onClick={toggleMenu}
          >
            <svg
              className={`block w-6 h-6 ${isMenuOpen ? "hidden" : "block"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 8h16M4 16h16"
              />
            </svg>

            <svg
              className={`block w-6 h-6 ${isMenuOpen ? "block" : "hidden"}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden items-center lg:flex lg:items-center lg:ml-auto lg:space-x-10">
            <Link
              to="/"
              className="text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-700"
            >
              Naslovna
            </Link>
            <Link
              to="/about"
              className="text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-700"
            >
              O nama
            </Link>
            <Link
              to="/donate"
              className="text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-700"
            >
              Doniraj
            </Link>
            <Link
              to="/leaderboard"
              className="text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-700"
            >
              Rang lista
            </Link>
          </div>

          {/* Desktop Buttons */}
          <Link
            to="/login"
            className="items-center justify-center hidden px-4 py-2 ml-10 font-semibold transition-all duration-200 bg-white border border-green-600 rounded-md text-green-700 lg:inline-flex  focus:bg-green-700 focus:text-white hover:text-white hover:bg-green-700"
          >
            Uloguj se
          </Link>

          <Link
            to="/register"
            className="items-center justify-center hidden px-4 py-2 ml-10 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md lg:inline-flex hover:bg-green-700 focus:bg-green-700"
          >
            Registruj se
          </Link>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md lg:hidden">
            <div className="flow-root">
              <div className="flex flex-col px-6 -my-2 space-y-1">
                <Link
                  to="/"
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-700"
                >
                  Naslovna
                </Link>
                <Link
                  to="/about"
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-700"
                >
                  Solutions
                </Link>
                <Link
                  to="/donate"
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-700"
                >
                  Resources
                </Link>
                <Link
                  to="/leaderboard"
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-700"
                >
                  Pricing
                </Link>
              </div>
            </div>

            <div className="px-6 mt-6">
              <Link
                to="/login"
                className="inline-flex justify-center px-4 py-3 text-green-700 font-semibold transition-all duration-200 bg-white border border-green-600 rounded-md items-center hover:bg-green-700 focus:text-white focus:bg-green-700 hover:text-white"
              >
                Uloguj se
              </Link>
            </div>

            <div className="px-6 mt-6">
              <Link
                to="/register"
                className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md items-center hover:bg-green-700 focus:bg-green-700"
              >
                Registruj se
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
