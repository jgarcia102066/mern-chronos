const router = require('express').Router();
let PayrollPeriod = require('../models/payrollperiod.model');

router.route('/').get((req, res) => {
    //returns all payroll periods
    PayrollPeriod.find()
    .then(payrollperiods => res.json(payrollperiods))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const payrollperiodid = req.body.payrollperiodid;
    const payrollperiodname = req.body.payrollperiodname;

    PayrollPeriod.find({payrollperiodid: req.body.payrollperiodid})
    .then(payrollperiod => {

        if (payrollperiod.length){
            payrollperiod.payrollperiodname = req.body.payrollperiodname;

            payrollperiod.save()
            .then(() => res.json('Existing Payroll Period Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        } else {
            const newPayrollPeriod = new PayrollPeriod({
                payrollperiodid, 
                payrollperiodname 
            });
        
            newPayrollPeriod.save()
            .then(() => res.json('Payroll Period Added'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    PayrollPeriod.findById(req.params.id)
    .then(payrollperiod => res.json(payrollperiod))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    PayrollPeriod.findById(req.params.id)
    .then(payrollperiod => 
        {
            payrollperiod.payrollperiodid = req.body.payrollperiodid;
            payrollperiod.payrollperiodname = req.body.payrollperiodname;

            payrollperiod.save()
            .then(() => res.json('Payroll Period Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    PayrollPeriod.findByIdAndDelete(req.param.id)
    .then(() => res.json("Payroll Period Deleted!"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/deleteall').delete((req, res) =>{
    //deletes all records from collection
    deleteAll();
});

router.route('/initialize').post((req, res) => {
    
    deleteAll();
    if (res.headersSent) return;
    addPayrollPeriod(res, 202001, 'January 15');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202002, 'January 31');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202003, 'February 15');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202004, 'February 29');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202005, 'March 15');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202006, 'March 31');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202007, 'April 15');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202008, 'April 30');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202009, 'May 15');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202010, 'May 31');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202011, 'June 15');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202012, 'June 30');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202013, 'July 15');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202014, 'July 31');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202015, 'August 15');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202016, 'August 31');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202017, 'September 15');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202018, 'September 31');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202019, 'October 15');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202020, 'October 31');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202021, 'November 15');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202022, 'November 30');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202023, 'December 15');
    if (res.headersSent) return;
    addPayrollPeriod(res, 202024, 'December 31');
    if (res.headersSent) return;
    res.json("Data Initialized!");
});

function addPayrollPeriod(res, payrollperiodid, payrollperiodname){
    const newPayrollPeriod = new PayrollPeriod({
        payrollperiodid, 
        payrollperiodname
    });

    newPayrollPeriod.save()
    .then()
    .catch(err => res.status(400).json('Error: ' + err));
}

function deleteAll(res){
    PayrollPeriod.deleteMany({})
    .then()
    .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = router;