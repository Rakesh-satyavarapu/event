import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CdcNav from './CdcNav'
import axios from "axios";

const DashboardCdc = () =>{
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
    <CdcNav />
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

export default DashboardCdc;

// const DashboardCdc = () => {
//   const [companies, setCompanies] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [form, setForm] = useState({
//     name: "",
//     cgpa: "",
//     branch: "",
//     deadline: "",
//     rounds: "",
//     requirements: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (editIndex !== null) {
//       const updated = [...companies];
//       updated[editIndex] = form;
//       setCompanies(updated);
//       setEditIndex(null);
//     } else {
//       setCompanies([...companies, { ...form }]);
//     }

//     setForm({
//       name: "",
//       cgpa: "",
//       branch: "",
//       deadline: "",
//       rounds: "",
//       requirements: "",
//     });
//   };

//   const handleDelete = (index) => {
//     const updated = companies.filter((_, i) => i !== index);
//     setCompanies(updated);
//     if (editIndex === index) {
//       setEditIndex(null);
//       setForm({
//         name: "",
//         cgpa: "",
//         branch: "",
//         deadline: "",
//         rounds: "",
//         requirements: "",
//       });
//     }
//   };

//   const handleEdit = (index) => {
//     setForm(companies[index]);
//     setEditIndex(index);
//   };

//   const eligibleStudents = (company) => {
//     const students = [
//       { name: "Alice", cgpa: 8.5, branch: "CSE" },
//       { name: "Bob", cgpa: 7.8, branch: "ECE" },
//       { name: "Charlie", cgpa: 9.0, branch: "CSE" },
//       { name: "Dave", cgpa: 8.2, branch: "IT" },
//       { name: "Eve", cgpa: 8.0, branch: "IT" },
//     ];

//     const eligibleBranches = company.branch
//       .split(/[,/]/)
//       .map((b) => b.trim().toLowerCase());

//     const minCGPA = parseFloat(company.cgpa);

//     return students.filter(
//       (student) =>
//         student.cgpa >= minCGPA &&
//         eligibleBranches.includes(student.branch.toLowerCase())
//     );
//   };

//   return (
//     <div className="container-fluid py-4">
//         <CdcNav />
//       <h1 className="mb-4">Company & Eligibility Management</h1>

//       <form onSubmit={handleSubmit} className="row g-3">
//         {Object.entries(form).map(([key, value]) => (
//           <div className="col-md-6" key={key}>
//             <label className="form-label text-capitalize">{key}</label>
//             <input
//               type={key === "deadline" ? "date" : "text"}
//               name={key}
//               value={value}
//               onChange={handleChange}
//               className="form-control"
//               required
//             />
//           </div>
//         ))}
//         <div className="col-12">
//           <button type="submit" className="btn btn-primary">
//             {editIndex !== null ? "Update Company" : "Add Company"}
//           </button>
//         </div>
//       </form>

//       <div className="mt-5">
//         <h2>Companies & Eligible Students</h2>
//         {companies.map((company, index) => (
//           <div key={index} className="card my-4 shadow-sm">
//             <div className="card-body">
//               <h5 className="card-title">{company.name}</h5>
//               <p className="card-text mb-1">
//                 <strong>CGPA:</strong> {company.cgpa} | <strong>Branch:</strong> {company.branch}
//               </p>
//               <p className="card-text mb-1">
//                 <strong>Deadline:</strong> {company.deadline}
//               </p>
//               <p className="card-text mb-1">
//                 <strong>Rounds:</strong> {company.rounds}
//               </p>
//               <p className="card-text mb-3">
//                 <strong>Requirements:</strong> {company.requirements}
//               </p>

//               <h6>Eligible Students:</h6>
//               <ul className="list-group mb-3">
//                 {eligibleStudents(company).length > 0 ? (
//                   eligibleStudents(company).map((student, i) => (
//                     <li key={i} className="list-group-item">
//                       {student.name} ({student.branch}, CGPA: {student.cgpa})
//                     </li>
//                   ))
//                 ) : (
//                   <li className="list-group-item">No eligible students</li>
//                 )}
//               </ul>

//               <div className="d-flex gap-2">
//                 <button
//                   className="btn btn-warning"
//                   onClick={() => handleEdit(index)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDelete(index)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };