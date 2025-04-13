import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [data, setData] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getToken = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  };

  const getUser = async () => {
    try {
      const res = await axios.get("/api/userData");
      setData(res.data.user);
    } catch (err) {
      console.log("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
    if (token) getUser();

    const interval = setInterval(() => {
      const token = getToken();
      setIsLoggedIn(!!token);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    navigate("/");
  };

  const renderNavLinksByRole = () => {
    if (data.role === "student") {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/student-dashboard">Dashboard</Link>
          </li>
        </>
      );
    } else if (data.role === "company") {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/company-dashboard">Dashboard</Link>
          </li>
        </>
      );
    } else if (data.role === "cdc") {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/cdc-dashboard">Dashboard</Link>
          </li>
        </>
      );
    }
    return null;
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg fixed-top px-3 py-3">
      <div className="container-fluid">
        <h1 className="navbar-brand">Automated College Placement Portal</h1>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto gap-3">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/login">Login</Link>
                </li>

                {/* Signup Dropdown */}
                <li className="nav-item dropdown">
                  <button
                    className="nav-link btn text-light dropdown-toggle"
                    id="signupDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Signup
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/register/student">Student</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register/company">Company</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register/cdc">CDC</Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                {renderNavLinksByRole()}

                {/* Profile Dropdown */}
                <li className="nav-item position-relative">
                  <button
                    className="nav-link btn text-light"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  >
                    Profile <i className="bi bi-person-circle"></i>
                  </button>

                  {showProfileDropdown && (
                    <div className="dropdown-menu show position-absolute end-0 mt-2 p-3 shadow rounded bg-white">
                      <div className="d-flex align-items-center gap-3">
                        <i className="bi bi-person-circle fs-3"></i>
                        <div>
                          <p className="m-0 fw-bold">{data.username}</p>
                          <p className="m-0 text-muted">{data.email}</p>
                        </div>
                      </div>
                      <hr />
                      <button className="btn btn-danger w-100" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i> Logout
                      </button>
                    </div>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
