import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CdcNav from './CdcNav';

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [companyNames, setCompanyNames] = useState({});
  const [applicationStatuses, setApplicationStatuses] = useState({});

  const fetchStudents = async () => {
    try {
      const res = await axios.get('/api/allStudents');
      const fetchedStudents = res.data.students;
      setStudents(fetchedStudents);

      // Collect unique company IDs
      const uniqueCompanyIds = new Set();
      fetchedStudents.forEach(student => {
        student.appliedJobs?.forEach(job => {
          const companyId = typeof job.companyId === 'string' ? job.companyId : job.companyId?._id;
          if (companyId) uniqueCompanyIds.add(companyId);
        });
      });

      // Fetch all company names
      await Promise.all(
        [...uniqueCompanyIds].map(async (companyId) => {
          try {
            const res = await axios.get(`/api/companies/${companyId}`);
            const companyName = res.data.companyDetails?.companyname || 'Unknown';
            setCompanyNames(prev => ({
              ...prev,
              [companyId]: companyName
            }));
          } catch (err) {
            console.error(`Error fetching company name for ${companyId}:`, err);
            setCompanyNames(prev => ({
              ...prev,
              [companyId]: 'Unknown'
            }));
          }
        })
      );

      // Fetch application statuses
      const statusPromises = [];
      fetchedStudents.forEach(student => {
        student.appliedJobs?.forEach(job => {
          const key = `${student._id}_${job._id}`;
          const promise = axios.get(`/api/student/status/${student._id}/${job._id}`)
            .then(res => {
              const status = res.data.applications?.[0]?.status || 'Unknown';
              return { key, status };
            })
            .catch(err => {
              console.error(`Error fetching status for ${key}:`, err);
              return { key, status: 'Unknown' };
            });
          statusPromises.push(promise);
        });
      });

      const statusResults = await Promise.all(statusPromises);
      const newStatuses = {};
      statusResults.forEach(({ key, status }) => {
        newStatuses[key] = status;
      });
      setApplicationStatuses(newStatuses);

    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'applied':
        return 'btn btn-default btn-primary';
      case 'interview':
        return 'btn btn-default btn-warning text-dark';
      case 'selected':
        return 'btn btn-default btn-success';
      case 'rejected':
        return 'btn btn-default btn-danger';
      default:
        return 'btn btn-default btn-secondary';
    }
  };

  return (
    <div>
      <CdcNav />
      <h2 className="text-center mt-4">All Students</h2>
      <div className="container row">
        {students.map((student) => (
          <div key={student._id} className="card m-2 p-3 col-md-4 shadow-sm">
            <h5 className="text-primary">
              <strong>{student.username}</strong> ({student.email})
            </h5>
            <p>
              <strong>Branch:</strong> {student.branch} | <strong>CGPA:</strong> {student.cgpa} |{' '}
              <strong>Backlogs:</strong> {student.backlogs}
            </p>

            <h6>Applied Jobs:</h6>
            {student.appliedJobs?.length > 0 ? (
              <ul>
                {student.appliedJobs.map((job, idx) => {
                  const companyId = typeof job.companyId === 'string' ? job.companyId : job.companyId?._id;
                  const companyName = typeof job.companyId === 'object'
                    ? job.companyId?.companyname
                    : companyNames[companyId] || 'Loading...';
                  const statusKey = `${student._id}_${job._id}`;
                  const status = applicationStatuses[statusKey] || 'Loading...';

                  return (
                    <div className=' d-flex justify-content-between m-2' key={idx}>
                      <p><strong>{job.title}</strong> at <em>{companyName}</em>{' '}</p>
                      <span className={getStatusBadgeClass(status)} > {status}</span>
                    </div>
                  );
                })}
              </ul>
            ) : (
              <p>No jobs applied.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllStudents;
