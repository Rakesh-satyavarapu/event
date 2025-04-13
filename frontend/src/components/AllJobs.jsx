import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import CdcNav from './CdcNav'

const AllJobs = () => {
    const { id } = useParams(); 
    const [company,setCompany] = useState('')
    const [jobs, setJobs] = useState([]);
  
    const getJobs = async () => {
      try {
        let res = await axios.get(`/api/companies/${id}`) 
        setCompany(res.data.companyDetails.companyname)  // Fetch jobs for the company
        setJobs(res.data.companyDetails.jobs)
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };
  
    useEffect(() => {
      getJobs();
    }, [id]);
  
    return (
        <div className="container-fluid">
        <h2 className="my-4">Jobs offered by {company}</h2>
        {jobs.length === 0 ? (
          <p>No jobs available.</p>
        ) : (
          <div className="row w-full">
            {jobs.map((job) => (
              <div key={job._id} className="col-md-6">
                <div className="card mb-4 shadow-sm">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h2 className="card-title">{job.title}</h2>
                        <h2 className="text-danger">{job.salary}</h2>
                    </div>
                    <p className="card-text"><strong>Description:</strong> {job.description}</p>
                    <p className="card-text"><strong>Requirements:</strong> {job.requirements.join(', ')}</p>
                    <p className="card-text"><strong> Minimum CGPA Required:</strong> {job.minCGPA} CGPA</p>
                    <p className="card-text"><strong>Branches:</strong> {job.allowedBranches.join(', ')}</p>
                    <p><strong>Stauts:</strong>{job.status=='Open'?(<span className="text-success h6"> OPEN</span>):(<span className="text-danger h6"> CLOSED</span>)}</p>
                    <p className="card-text"><strong>Location:</strong> {job.location}</p>        
                 </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
}

export default AllJobs
