const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./middleware/error-handler');

const db = require('./config/db/connectionDAO');


// Connect to DB
db.connect();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use('/auth', require('./routes/auth.router'));
//admin
app.use('/accounts', require('./routes/account.router'));
app.use('/doctors', require('./routes/doctor.router'));
app.use('/servicebases', require('./routes/servicebase.routrer'));

//dịch vụ: api getall, getbyid thì user với admin chung còn lại của admin 
app.use('/services', require('./routes/service.router'));

//hóa đơn: api getbyid user admin dùng chung còn lại của admin
app.use('/bills', require('./routes/bill.router'));
app.use('/patients', require('./routes/patient.router'));
app.use('/patientservices', require('./routes/patient_service.router'));
// global error handler
app.use(errorHandler);

app.listen(3000, function() {
    console.log('Node server running @ http://localhost:3000')
});