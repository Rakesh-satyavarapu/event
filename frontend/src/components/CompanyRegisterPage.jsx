import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompanyRegisterPage = () => {
  const [companyname, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location,setLocation] = useState('')
  const[website,setWebsite]=useState('')
  const[description,setDescrip]=useState('')
  const[logo,setLogo]=useState('')
    
  const [message, setMessage] = useState('');

  const navigate = useNavigate()
  const formHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/companyRegister",{companyname, email, password,location,website,description,logo});
      console.log(response.data);
      setMessage("company registered successfully!");
      // Reset form
      setCompanyName('');
      setEmail('');
      setPassword('');
      setLocation('')
      setWebsite('')
      setDescrip('')
      setLogo('')
      navigate('/login')
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="container mt-2" style={{ maxWidth: "600px" }}>
      <br></br>
      <h2 className="mb-4 text-center">Company Registration</h2>

      {message && (
        <div className="alert alert-info text-center">{message}</div>
      )}

      <form onSubmit={formHandle}>
        <input
          name="companyname"
          placeholder="companyname"
          value={companyname}
          onChange={(e) => setCompanyName(e.target.value)}
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
  className="form-control mb-3"
  name="location"
  placeholder="Company Location"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
  required
/>

<input
  className="form-control mb-3"
  name="website"
  placeholder="Website URL"
  value={website}
  onChange={(e) => setWebsite(e.target.value)}
/>

<textarea
  className="form-control mb-3"
  name="description"
  placeholder="Company Description"
  value={description}
  onChange={(e) => setDescrip(e.target.value)}
/>

<input
  className="form-control mb-3"
  name="logo"
  placeholder="Logo Image URL"
  value={logo}
  onChange={(e) => setLogo(e.target.value)}
/>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default CompanyRegisterPage;
