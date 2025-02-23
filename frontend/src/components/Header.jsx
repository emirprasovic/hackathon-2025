import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("zed" + isLoggedIn);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(function () {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setIsLoggedIn(true);
    } else {
      console.log("You Are Not Logged In");
    }
  }, []);

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
              to="/merch"
              className="text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-700"
            >
              Merch
            </Link>
            <Link
              to="/leaderboard"
              className="text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-700"
            >
              Rang lista
            </Link>
          </div>

          {/* Desktop Buttons */}
          {isLoggedIn ? (
            <div className="hidden lg:flex lg:items-center lg:ml-10">
              <Link
                to="/profile"
                className="px-4 py-2 text-base font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Profil
              </Link>
            </div>
          ) : (
            <div className="hidden lg:flex lg:items-center lg:ml-10">
              <Link
                to="/login"
                className="px-4 py-2 mr-4 font-semibold text-green-700 bg-white border border-green-600 rounded-md hover:bg-green-700 hover:text-white"
              >
                Prijava
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-base font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Registracija
              </Link>
            </div>
          )}
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
                  O nama
                </Link>
                <Link
                  to="/donate"
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-700"
                >
                  Doniraj
                </Link>
                <Link
                  to="/leaderboard"
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-700"
                >
                  Rang lista
                </Link>
                <Link
                  to="/merch"
                  className="inline-flex py-2 text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-700"
                >
                  Artikli
                </Link>
              </div>
            </div>

            {isLoggedIn && (
              <div className="px-6 mt-6">
                <Link
                  to="/profile"
                  className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md items-center hover:bg-green-700 focus:bg-green-700"
                >
                  Profil
                </Link>
              </div>
            )}
            {!isLoggedIn && (
              <div>
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
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
