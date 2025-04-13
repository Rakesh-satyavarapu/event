import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const StudentRegisterPage = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [resume, setResume] = useState('');
  const [branch, setBranch] = useState('');
  const [backlogs, setBacklogs] = useState(0);
  const [message, setMessage] = useState('');

  
  const navigate = useNavigate()
  const formHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/studentRegister",
        { username, email, password, cgpa, resume, branch, backlogs },
        { withCredentials: true }
      );
      console.log(response.data);
      setMessage("Student registered successfully!");
      // Reset form
      setUserName('');
      setEmail('');
      setPassword('');
      setCgpa('');
      setResume('');
      setBranch('');
      setBacklogs(0);
      navigate('/login')
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      
      <h2 className="mb-4 text-center">Student Registration</h2>

      {message && (
        <div className="alert alert-info text-center">{message}</div>
      )}

      <form onSubmit={formHandle}>
        <input
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
          className="form-control mb-3"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control mb-3"
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
          name="cgpa"
          type="number"
          step="0.01"
          placeholder="CGPA"
          value={cgpa}
          onChange={(e) => setCgpa(e.target.value)}
          className="form-control mb-3"
        />

        <select
          name="branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          required
          className="form-control mb-3"
        >
          <option value="">Select Branch</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>

        <input
          name="resume"
          placeholder="Resume URL (optional)"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          className="form-control mb-3"
        />

        <input
          name="backlogs"
          type="number"
          placeholder="Backlogs"
          value={backlogs}
          onChange={(e) => setBacklogs(e.target.value)}
          className="form-control mb-3"
        />

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentRegisterPage;
