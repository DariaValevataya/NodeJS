const express = require('express');
const app = express();
const path = require('path');
const facultyRouter=require("./routes/FacultyRouter")
const pulpitRouter=require("./routes/PulpitRouter")
const subjectRouter=require("./routes/SubjectRouter")
const teacherRouter=require("./routes/TeacherRouter")
const auditoriumRouter=require("./routes/AuditoriumRouter")
const auditoriumTypeRouter=require("./routes/AuditoriumTypeRouter")

app.use('/api', facultyRouter );
app.use('/api', pulpitRouter );
app.use('/api', subjectRouter );
app.use('/api', teacherRouter );
app.use('/api', auditoriumTypeRouter );
app.use('/api', auditoriumRouter );
app.get('/', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'index.html'));
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: '404'});
  }
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});