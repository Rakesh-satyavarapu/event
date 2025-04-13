import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CDCRegisterPage = () => {
  const [name, setName] = useState("");
  const [staffId, setStaffId] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("Staff");

  const [message, setMessage] = useState("");

  const navigate = useNavigate() 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/cdcRegister", {
        name,
        staffId,
        password,
        department,
        role
      });

      setMessage("CDC Staff Registered Successfully!");
      console.log(res.data);

      setName("");
      setPassword("")
      setStaffId("");
      setDepartment("");
      setRole("Staff");
      navigate('/login')
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h2 className="text-center mb-4">CDC Staff Registration</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="form-control mb-3"
          placeholder="Staff ID"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-control mb-3"
        />
        <input
          className="form-control mb-3"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <select
          className="form-control mb-3"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Staff">Staff</option>
          <option value="Admin">Admin</option>
        </select>

        <button className="btn btn-primary w-100" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default CDCRegisterPage;
