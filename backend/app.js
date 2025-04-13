const express = require('express');
const app = express();
const axios = require('axios');
let env = require('dotenv')

env.config();  
const PORT = process.env.PORT || 5000;
let bcrypt=require('bcrypt')
let jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const { spawn } = require("child_process");
const cors = require('cors')
app.use(cors({credentials:true}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))
app.use(cookieParser())

const mongoose = require('mongoose')
let student = require('./models/student.model')
let company = require('./models/company.model')
let application = require('./models/application.model')
let job = require('./models/job.model')
let CDC = require('./models/CDCSchema.model')
const questSchema = require('./models/quest.model');

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function isLoggedIn(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized. Please log in." }); // Send JSON response
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Invalid or expired token." });
    }
}

app.post('/api/studentRegister',async (req,res)=>{
  let { username, email, password, cgpa, branch, resume, backlogs } = req.body;
  let checkEmail = await student.findOne({ email });
      if (checkEmail) return res.status(400).json({ error: "Email already exists" });

  let checkUser = await student.findOne({ username });
      if (checkUser) return res.status(400).json({ error: "Username already exists" });
  bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(password,salt,async(err,hash)=>{
          
          let createdUser = await student.create({username, email, password:hash, cgpa, branch, resume, backlogs })
          console.log("user created",createdUser.username,createdUser.password)
          
      })
  })

  let token = jwt.sign({email:email},process.env.JWT_SECRET)
  res.json({token:token})
})

app.post('/api/companyRegister',async(req,res)=>{
    let { companyname, email, password,location,website,description,logo } = req.body;
    let checkEmail = await company.findOne({ email });
        if (checkEmail) return res.status(400).json({ error: "Email already exists" });
  
    let checkUser = await company.findOne({ companyname });
        if (checkUser) return res.status(400).json({ error: "company already exists" });
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            
            let createdUser = await company.create({companyname, email, password:hash,location,website,description,logo})
            console.log("user created",createdUser.companyname,createdUser.password)
            
        })
    })
  
    let token = jwt.sign({email:email},process.env.JWT_SECRET)
    res.json({token:token})
  })
  
  app.post('/api/cdcRegister', async (req, res) => {
    try {
      const {
        userId,
        name,
        password,
        staffId,
        department,
        role
      } = req.body;
  
      // Check if staff ID already exists
      const existingStaff = await CDC.findOne({ staffId });
      if (existingStaff) {
        return res.status(400).json({ error: "Staff ID already registered" });
      }
  
      // Hash the password
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
  
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
  
          // Create new CDC staff member with hashed password
          const newCDC = await CDC.create({
            userId,
            name,
            staffId,
            password: hash,
            department,
            role
          });
  
          // Generate JWT
          const token = jwt.sign(
            { userId: userId, role: role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
          );
  
          console.log("CDC Staff Registered:", newCDC.name);
  
          res.status(201).json({
            message: "CDC Staff Registered Successfully",
            cdc: newCDC,
            token: token,
          });
        });
      });
  
    } catch (err) {
      console.error("CDC Register Error:", err.message);
      res.status(500).json({ error: "Server Error" });
    }
  });
  
  app.post('/api/studentLogin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await student.findOne({ email });
      if (!user) return res.status(400).json({ error: "Email not found" });
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: "Invalid password" });
  
      const token = jwt.sign({ email: user.email ,id:user._id}, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
      });
  
      res.json({ message: "Student login successful", token });
    } catch (err) {
      console.error("Student Login Error:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  app.post('/api/companyLogin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await company.findOne({ email });
      if (!user) return res.status(400).json({ error: "Email not found" });
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: "Invalid password" });
  
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
      });
  
      res.json({ message: "Company login successful", token });
    } catch (err) {
      console.error("Company Login Error:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.post('/api/cdcLogin', async (req, res) => {
    const { staffId, password } = req.body;
  
    try {
      const user = await CDC.findOne({ staffId });
      if (!user) return res.status(400).json({ error: "Staff ID not found" });
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: "Invalid password" });
  
      const token = jwt.sign({ staffId: user.staffId, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
      });
  
      res.json({ message: "CDC login successful", token });
    } catch (err) {
      console.error("CDC Login Error:", err.message);
      res.status(500).json({ error: "Server error" });
    }
  });
    
mongoose.connect(`${process.env.MONGODB_URL}/project`)
.then(()=>{
    console.log('database connected')
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
})
})

.catch((err)=>{console.log('error',err.message)})


const formatResponseText = (responseText) => {
  // Convert **bold** text to <b>bold</b> HTML tags
  responseText = responseText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  // Convert * bullet points to <li> elements inside <ul> tags
  responseText = responseText.replace(/\* (.*?)(?=\n|\r|\r\n|\n|$)/g, "<li>$1</li>");

  // Wrap bullet points in <ul> if not already wrapped
  if (responseText.includes("<li>")) {
      responseText = `<ol>${responseText}</ol>`;
  }

  return responseText;
};

app.post('/chatInput', isLoggedIn, async (req, res) => {
  const { quest } = req.body;

  if (!quest) {
      return res.status(400).json({ success: false, response: "Please enter a question!" });
  }

  try {
      // Store the question in MongoDB
      const userdetails = await student.findOne({ email: req.user.email });
      await questSchema.create({ user: userdetails._id, quest });

      const pythonProcess = spawn('python', ['predict.py', quest]);

      let responseText = '';
      let errorText = '';

      pythonProcess.stdout.on('data', (data) => {
          responseText += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
          errorText += data.toString();
      });

      pythonProcess.on('close', async (code) => {
          if (code === 0) {
              const formattedResponse = formatResponseText(responseText.trim());
              res.status(200).json({
                  success: true,
                  user: userdetails.email,
                  response: formattedResponse, // Send the formatted response
              });
          } else {
              console.error('Python process error:', errorText);
              res.status(500).json({ success: false, error: `Error processing AI response: ${errorText || 'Unknown error'}` });
          }
      });

  } catch (error) {
      console.error("Error handling chat input:", error);
      res.status(500).json({ success: false, error: "Error processing request." });
  }
});

//student user logged in
app.get('/api/userData',isLoggedIn,async(req,res)=>{
  const data = await student.findOne({email:req.user.email})
  res.json({user:data})
})

app.get('/api/companies',isLoggedIn,async(req,res)=>{
  const data = await company.find({}).populate('jobs')
  res.json({user:data})
})

app.post('/api/Uploadjobs',isLoggedIn,async(req,res)=>{
  let {title,description,requirements,minCGPA,maxBacklogs,allowedBranches,salary,location,deadline} = req.body
  try{
  const companyDetails = await company.findOne({email:req.user.email})
  const companyId = companyDetails._id
    let jobDetails = await job.create({companyId,title,description,requirements,minCGPA,maxBacklogs,allowedBranches,salary,location,deadline})
    res.json({res:'success'})
    companyDetails.jobs.push(jobDetails)
    await companyDetails.save()
  }
  catch(err)
  {
    console.log(err)
  }
})

app.get('/api/companies/:id', async (req, res) => {
  let id = req.params.id
  try {
    const companyDetails = await company.findById(id).populate('jobs'); // Populate jobs for the company
    if (!companyDetails) {
      return res.status(404).json({ error: "Company not found" });
    }
    console.log(companyDetails)
    res.json({companyDetails});  // Send the jobs array back in the response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/api/RegisterJob/:id',isLoggedIn, async (req, res) => {
  let id = req.params.id
  try {
    const jobDetails = await job.findById(id)
    const user = await student.findById(req.user.id)
    if (!jobDetails) {
      return res.status(404).json({ error: "job not found" });
    }
    jobDetails.applications.push({studentId: req.user.id,
      status: 'Applied',
      appliedAt: new Date(),
    })
    const Addapplication = await application.create({studentId:req.user.id,jobId:id,status:'Applied'}) 
    await jobDetails.save()
    user.appliedJobs.push(id)
    await user.save()
    res.json({response:'true'});  // Send the jobs array back in the response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get('/api/student/applications',isLoggedIn,async(req,res)=>{
  const apps = await application.find({studentId:req.user.id}).populate('jobId')
  res.json({applications:apps})
})

app.get('/api/allStudents',async(req,res)=>{
  const students = await student.find({}).populate('appliedJobs')
  res.json({students})
})

app.get('/api/companyJobs',isLoggedIn,async(req,res)=>{
  const data = await company.find({email:req.user.email}).populate('jobs')
  res.json({user:data})
})

app.get('/api/student/status/:studentId/:jobId',async(req,res)=>{
  const {studentId,jobId} = req.params 
  const apps = await application.find({studentId,jobId})
  res.json({applications:apps})
})