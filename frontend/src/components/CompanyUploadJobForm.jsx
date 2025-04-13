import React, { useState } from 'react';
import CompanyNav from './CompanyNav'

import axios from 'axios';

const CompanyUploadJobForm = () => {
  const initialJobState = {
    title: '',
    description: '',
    requirements: '',
    minCGPA: '',
    maxBacklogs: '',
    allowedBranches: '',
    salary: '',
    location: '',
    deadline: '',
  };

  const [job, setJob] = useState(initialJobState);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        '/api/Uploadjobs',
        {
          ...job,
          requirements: job.requirements.split(',').map(req => req.trim()),
          allowedBranches: job.allowedBranches.split(',').map(branch => branch.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Job posted successfully!');
      setJob(initialJobState); // Reset form
    } catch (err) {
      console.error(err);
      alert('Failed to post job.');
    }
  };

  return (
    <div className='container-fluid'>
      <CompanyNav />
      <div className='d-flex flex-column align-items-center justify-content-center mt-5'>
      <h1>New JOB Requirements</h1>
      <form onSubmit={handleSubmit} className='form-group w-75'>
        <input className="form-control mb-2" name="title" placeholder="Job Title" value={job.title} onChange={handleChange} />
        <textarea className="form-control mb-2" name="description" placeholder="Description" value={job.description} onChange={handleChange} />
        <input className="form-control mb-2" name="requirements" placeholder="Requirements (comma separated)" value={job.requirements} onChange={handleChange} />
        <input className="form-control mb-2" name="minCGPA" placeholder="Min CGPA" type="number" value={job.minCGPA} onChange={handleChange} />
        <input className="form-control mb-2" name="maxBacklogs" placeholder="Max Backlogs" type="number" value={job.maxBacklogs} onChange={handleChange} />
        <input className="form-control mb-2" name="allowedBranches" placeholder="Allowed Branches (comma separated)" value={job.allowedBranches} onChange={handleChange} />
        <input className="form-control mb-2" name="salary" placeholder="Salary" value={job.salary} onChange={handleChange} />
        <input className="form-control mb-2" name="location" placeholder="Location" value={job.location} onChange={handleChange} />
        <input className="form-control mb-2" name="deadline" placeholder="Deadline (YYYY-MM-DD)" type="date" value={job.deadline} onChange={handleChange} />
        <button type="submit" className="btn btn-success">Upload Job</button>
      </form>
    </div>
    </div>
  );
};

export default CompanyUploadJobForm;
