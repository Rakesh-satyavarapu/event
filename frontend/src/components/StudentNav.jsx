// components/StudentNav.js

import React from "react";
import { Link } from "react-router-dom";
import { getUserRole } from "../utils/auth";

const StudentNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/student/dashboard">Student Dashboard</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/student/jobs">View Jobs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chat">AI assistant</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/student/applications">My Applications</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact CDC</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={() => localStorage.clear()}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default StudentNav;
