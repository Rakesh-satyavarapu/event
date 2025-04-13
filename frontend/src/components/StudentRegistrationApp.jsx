import React, { useState, useEffect } from "react";
import axios from 'axios';
import StudentNav from './StudentNav';

const StudentRegistrationApp = () => {
  const [student, setStudent] = useState(null);
  const [companies, setCompany] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('/api/userData');
        setStudent(response.data.user);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudentData();
  }, []);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get('/api/companies');
        setCompany(response.data.user);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchCompanyData();
  }, []);

  const handleRegister = async (companyName, jobid) => {
    try {
      const appliedJob = await axios.get(`/api/RegisterJob/${jobid}`);
      if (appliedJob.data.response === 'true') {
        alert(`Successfully Registered for the Job in ${companyName}`);
        // Update student state to add jobid to appliedJobs
        setStudent(prev => ({
          ...prev,
          appliedJobs: [...(prev.appliedJobs || []), jobid]
        }));
      }
    } catch (error) {
      console.error("Error registering for job:", error);
    }
  };

  const isEligible = (job) => {
    if (!student) return false;
    const allowedBranches = job.allowedBranches.map(branch => branch.toLowerCase().trim());
    const studentBranch = student.branch.toLowerCase().trim();
  
    return (
      student.cgpa >= job.minCGPA &&
      allowedBranches.includes(studentBranch)
    );
  };
  

  if (!student) {
    return (
      <div className="container py-4">
        <StudentNav />
        <p>Loading student data...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <StudentNav />
      <br />
      <h2 className="mb-3">
        Welcome, <span className="text-danger">{student.username}</span>
      </h2>
      <p>
        <strong>CGPA:</strong> {student.cgpa} | <strong>Branch:</strong> {student.branch}
      </p>

      <h4 className="mt-4">Eligible Companies</h4>
      {companies.map((company, index) => {
        const eligibleJobs = company.jobs.filter(job => isEligible(job));
        console.log(eligibleJobs)
        return (
          <div key={index} className="card my-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{company.companyname.toUpperCase()}</h5>
              {eligibleJobs.map((job) => {
                const alreadyApplied = student.appliedJobs?.includes(job._id);

                return (
                  <div key={job._id} className="mb-3">
                    <p className="card-text">
                      <strong>Title:</strong> {job.title}<br />
                      <strong>Min CGPA:</strong> {job.minCGPA}<br />
                      <strong>Allowed Branches:</strong> {job.allowedBranches.join(', ')}<br />
                      <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
                    </p>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleRegister(company.companyname, job._id)}
                      disabled={alreadyApplied}
                    >
                      {alreadyApplied ? "Registered" : "Register"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StudentRegistrationApp;


// const isRegistered = (jobId) => {
  //   return applications.some(
  //     (app) => app.jobId === jobId && app.status === "Registered"
  //   );
  // };

  // const handleRegister = (companyName, job) => {
  //   setApplications((prev) => [
  //     ...prev.filter(app => app.jobId !== job._id),
  //     {
  //       company: companyName,
  //       jobId: job._id,
  //       title: job.title,
  //       status: "Registered"
  //     }
  //   ]);
  // };

  // const handleWithdraw = (jobId) => {
  //   setApplications((prev) =>
  //     prev.map((app) =>
  //       app.jobId === jobId ? { ...app, status: "Withdrawn" } : app
  //     )
  //   );
  // };

{/* {registered ? (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleWithdraw(job._id)}
                      >
                        Withdraw
                      </button>
                    ) : (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleRegister(company.companyname, job)}
                      >
                        Register
                      </button>
                    )} */}