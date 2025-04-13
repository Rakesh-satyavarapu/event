import React, { useEffect, useState } from 'react'
import CompanyNav from './CompanyNav'
import axios from 'axios'

const JobsProvided = () => {
    const [jobs,setJobs] = useState([])
    const fetchJobs = async() =>{
        let res = await axios.get('/api/companyJobs')
        setJobs(res.data.user[0].jobs)
    }

    useEffect(()=>{
        fetchJobs()
    },[])
  return (
    <div className='container-fluid'>
      <CompanyNav />
      <h1 className='text-center'>Jobs Offered</h1>
      <div className='row'>
        {jobs.map((job)=>(
            <div className='card p-3 m-3 col-md-3'>
                <div className='d-flex justify-content-between'>
                <h5 className='h5'>{job.title}</h5>
                <h5 className='text-danger'>₹ {job.salary}</h5>
                </div>
                <p className='card-text'>{job.description}</p>
                <h5 className='h5'>Applications Count : {job.applications.length}</h5>
                <h5 className='h5'>location : {job.location}</h5>
                <h5 className='h5'>Deadline : {job.deadline && new Date(job.deadline) > new Date() ?(<span className='text-success'>{new Date(job.deadline).toLocaleDateString()}</span>):(<span className='text-danger'>{new Date(job.deadline).toLocaleDateString()}</span>)}</h5>
            </div>
        ))}
      </div>
    </div>
  )
}

export default JobsProvided
