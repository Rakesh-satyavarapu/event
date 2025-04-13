import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentNav from "./StudentNav";

import axios from "axios";

const Jobs = () =>{
  const [companies,setCompanies] = useState([])
  const navigate = useNavigate();

  const getCompanies = async() =>{
    let res =  await axios.get('/api/companies')
     setCompanies(res.data.user)
     console.log("res",res)
  }

  const openJobs = (id) =>{
    navigate(`/companyJobs/${id}`)
  }

    useEffect(()=>{getCompanies()},[])
    console.log(companies)
    return(
    <div className="container-fluid">
    <StudentNav />
    <h1 className="text-center text-info">Companies</h1>
    <ul className="row d-flex">
    {companies.map((company)=>(
      <div key={company._id} className="card col-md-3 m-2" >
      <div className="card-body" >
      <img 
        src={company.logo} 
        alt={`${company.companyname} logo`} 
        className="img-fluid w-full" 
        style={{objectFit:'contain', height:'250px'}} 
        />
        <h3 className="card-title">{company.companyname}</h3>
        <p className="card-text">{company.description}</p>
        <button className="btn btn-primary" onClick={()=>openJobs(company._id)}>Jobs Offered</button>
      </div>
    </div>
    ))}
    </ul>
    </div>
  )
}

export default Jobs;