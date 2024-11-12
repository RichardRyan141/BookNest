import React, { useState, useEffect } from "react";
import "./Header.css";
import Modal from "../Modal/Modal"; // Import Modal component
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../AuthContext/AuthContext";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication

  // Check if the user is logged in (if token exists in localStorage)

  const openLoginForm = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const openRegisterForm = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const closeForm = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const logout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      return;
    }

    // Decode the JWT to extract userId (you can use a library like jwt-decode)
    const decodedToken = jwtDecode(token);
    const userId = decodedToken?.id; // Assuming your token has an `id` field for userId

    if (!userId) {
      console.log("User ID not found in token");
      return;
    }

    // Call the backend logout API
    await fetch("http://localhost:5000/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }), // Send userId in request body
    });

    // Remove token from localStorage and update state
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
    await Swal.fire({
      icon: "success",
      title: "Logout Successful",
      text: "See you again!",
      timer: 2000,
      showConfirmButton: false,
    });
    console.log("Logged out successfully");
  };

  return (
    <div>
      {/* <div classNameName="readNav">
        <div classNameName="logo">
          <h1>
            <a href="/" classNameName="littleLogo">
              BookNest
            </a>
          </h1>
        </div>
        <nav classNameName="navigation">
          {isAuthenticated ? (
            <button onClick={logout} classNameName="logout-button">
              Logout
            </button>
          ) : (
            <button
              onClick={openLoginForm}
              classNameName="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          )}
        </nav>
      </div> */}

      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 ">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
              <img
                src="/logo512.png"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                BookNest
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              {isAuthenticated ? (
                <>
                  <Link to="/inbox">
                    <img
                      className="w-10 h-10 rounded mr-2"
                      src="/mail.png"
                      alt="Inbox"
                    />
                  </Link>
                  <Link to="/profile">
                    <img
                      className="w-10 h-10 rounded"
                      src="/boy.png"
                      alt="Default avatar"
                    />
                  </Link>
                  <a
                    href="#"
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                    onClick={logout}
                  >
                    Log Out
                  </a>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <a
                      href="#"
                      className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                    >
                      Log in
                    </a>
                  </Link>
                  <Link to="/register">
                    <a
                      href="/"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Register
                    </a>
                  </Link>
                </>
              )}

              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 ${
                        isActive
                          ? "text-white bg-blue-700 lg:text-blue-700"
                          : "text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 lg:dark:hover:bg-transparent dark:border-gray-700"
                      }`
                    }
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/community"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 ${
                        isActive
                          ? "text-white bg-blue-700 lg:text-blue-700"
                          : "text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 lg:dark:hover:bg-transparent dark:border-gray-700"
                      }`
                    }
                  >
                    Community
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/marketplace"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 ${
                        isActive
                          ? "text-white bg-blue-700 lg:text-blue-700"
                          : "text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 lg:dark:hover:bg-transparent dark:border-gray-700"
                      }`
                    }
                  >
                    Market
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/page3"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 rounded lg:bg-transparent lg:p-0 ${
                        isActive
                          ? "text-white bg-blue-700 lg:text-blue-700"
                          : "text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 lg:dark:hover:bg-transparent dark:border-gray-700"
                      }`
                    }
                  >
                    Page 3
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Using the Modal component to display forms */}
      <Modal isOpen={showLogin} onClose={closeForm}>
        <LoginForm
          onClose={closeForm}
          onRegisterClick={openRegisterForm}
          onLoginSuccess={() => setIsAuthenticated(true)}
        />
      </Modal>

      <Modal isOpen={showRegister} onClose={closeForm}>
        <RegisterForm onClose={closeForm} onLoginClick={openLoginForm} />
      </Modal>
    </div>
  );
};

export default Header;
