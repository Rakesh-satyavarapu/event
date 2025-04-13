import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import StudentRegisterPage from './components/StudentRegisterPage';
import CompanyRegisterPage from './components/CompanyRegisterPage';
import CDCRegisterPage from './components/CDCRegisterPage';
import AllStudents from './components/AllStudents';
import Contact from './components/Contact';
import Logout from './components/Logout';
import Jobs from './components/Jobs';
import Chat from './components/Chat';
import LoginPage from './components/LoginPage';
import CompApplications from './components/CompApplications'
import DashboardCdc from './components/DashboardCdc';
import StudentRegistrationApp from './components/StudentRegistrationApp';
import CompanyUploadJobForm from './components/CompanyUploadJobForm'
import AllJobs from './components/AllJobs';
import MyApplications from './components/MyApplications';
import JobsProvided from './components/JobsProvided';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='register/student' element={<StudentRegisterPage/>} />
        <Route path='/register/company' element={<CompanyRegisterPage/>} />
        <Route path='/register/cdc' element={<CDCRegisterPage/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/student/jobs" element={<Jobs />} />
        <Route path="/cdc/students" element={<AllStudents/>} />
        <Route path="/cdc-dashboard" element={<DashboardCdc />} />
        <Route path="/company-dashboard" element={<CompanyUploadJobForm />} />
        <Route path="/student-dashboard" element={<StudentRegistrationApp />} />
        <Route path="/companyJobs/:id" element={<AllJobs />} />
        <Route path="/company/jobs" element={<JobsProvided />} />
        <Route path="/company/applications" element={<CompApplications />} />
        <Route path="/student/applications" element={<MyApplications />} />
        <Route path="/logout" element={<Logout />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
