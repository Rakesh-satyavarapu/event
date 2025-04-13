import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [role, setRole] = useState("Student");
  const [emailOrId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    let endpoint = "";
    let payload = {};

    switch (role) {
      case "Student":
        endpoint = "/api/studentLogin";
        payload = { email: emailOrId, password };
        break;
      case "Company":
        endpoint = "/api/companyLogin";
        payload = { email: emailOrId, password };
        break;
      case "CDC":
        endpoint = "/api/cdcLogin";
        payload = { staffId: emailOrId, password };
        break;
      default:
        setMessage("Invalid role selected.");
        return;
    }

    try {
      const res = await axios.post(endpoint, payload, {
        withCredentials: true,
      });
      console.log(res.data);
      setMessage(`${role} logged in successfully!`);

      // Navigate to the respective dashboard based on role:
      if (role === "Student") {
        navigate("/student-dashboard");
      } else if (role === "Company") {
        navigate("/company-dashboard");
      } else if (role === "CDC") {
        navigate("/cdc-dashboard");
      }

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Login failed.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "750px" }}>
      <br/><br/><br/><br/><br/>
      <h2 className="mb-4 text-center">Login Portal</h2>

      {message && <div className="alert alert-info text-center">{message}</div>}

      <form onSubmit={handleLogin}>
        <select
          className="form-control mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Student">Student</option>
          <option value="Company">Company</option>
          <option value="CDC">CDC</option>
        </select>

        <input
          type={role === "CDC" ? "text" : "email"}
          className="form-control mb-3"
          placeholder={role === "CDC" ? "Staff ID" : "Email"}
          value={emailOrId}
          onChange={(e) => setEmailOrId(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>
      <br/>
      <p className="text-center">If account doesn't exist <Link to='/'>click here</Link></p>
    </div>
  );
};

export default LoginPage;
