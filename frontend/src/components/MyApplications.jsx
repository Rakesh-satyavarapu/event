import React, { useState, useEffect } from 'react'
import StudentNav from './StudentNav'
import axios from 'axios'

const MyApplications = () => {
    const [applications, setApplications] = useState([])
    const [companyNames, setCompanyNames] = useState({})

    const fetchApplications = async () => {
        try {
            const res = await axios.get('/api/student/applications')
            setApplications(res.data.applications)
        } catch (err) {
            console.error('Error fetching applications:', err)
        }
    }

    const fetchCompanyName = async (companyId) => {
        if (companyNames[companyId]) return // Skip if already fetched
        try {
            const res = await axios.get(`/api/companies/${companyId}`)
            setCompanyNames(prev => ({
                ...prev,
                [companyId]: res.data.companyDetails.companyname
            }))
        } catch (err) {
            console.error(`Error fetching company name for ID ${companyId}:`, err)
            setCompanyNames(prev => ({
                ...prev,
                [companyId]: 'Unknown'
            }))
        }
    }

    useEffect(() => {
        fetchApplications()
    }, [])

    useEffect(() => {
        applications.forEach(app => {
            if (app.jobId && app.jobId.companyId) {
                fetchCompanyName(app.jobId.companyId)
            }
        })
    }, [applications])

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString(undefined, options)
    }

    return (
        <div className="container-fluid mt-2">
            <StudentNav />
            <h1 className="text-center mb-4">My Applications</h1>
            {applications.length === 0 ? (
                <p className="text-center">No applications found</p>
            ) : (
                <div className="row">
                    {applications.map((application, index) => (
                        <div key={index} className="col-md-6 mb-4">
                            <div className="card shadow-sm border-primary h-100">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <h4 className="card-title mb-0">{application.jobId.title}</h4>
                                        <span className={`badge ${application.status === 'Applied' ? 'bg-success' : 'bg-danger'}`}>
                                            {application.status}
                                        </span>
                                    </div>
                                    <p className="mb-1">
                                        <strong>Company:</strong> {companyNames[application.jobId.companyId] || 'Loading...'}
                                    </p>
                                    <p className="mb-1"><strong>Location:</strong> {application.jobId.location}</p>
                                    <p className="mb-1"><strong>Salary:</strong> {application.jobId.salary}</p>
                                    <p className="mb-1"><strong>Deadline:</strong> {formatDate(application.jobId.deadline)}</p>
                                    <p className="mb-1"><strong>Min CGPA:</strong> {application.jobId.minCGPA}</p>
                                    <p className="mb-1"><strong>Max Backlogs:</strong> {application.jobId.maxBacklogs}</p>
                                    <p className="mb-1"><strong>Job Status:</strong> {application.jobId.status}</p>
                                    <p className="mb-1"><strong>Requirements:</strong> {application.jobId.requirements.join(', ')}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyApplications
