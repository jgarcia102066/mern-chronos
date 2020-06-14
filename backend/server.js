const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
})

const departmentRouter = require('./routes/departments');
const userRouter = require('./routes/users');
const payrollPeriodRouter = require('./routes/payrollperiod');
const timeTypeRouter = require('./routes/timetype');
const userTimeTakenRouter = require('./routes/usertimetaken');

app.use('/departments', departmentRouter);
app.use('/users', userRouter);
app.use('/payrollperiod', payrollPeriodRouter);
app.use('/timetype', timeTypeRouter);
app.use('/usertimetaken', userTimeTakenRouter);

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})

