const router = require('express').Router();
let UserTimeTaken = require('../models/usertimetaken.model');

router.route('/').get((req, res) => {
    //returns all time types
    UserTimeTaken.find()
    .then(usertimetaken => res.json(usertimetaken))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const userid = req.body.user._id;
    const timetypeid = req.body.timetype._id;
    const payrollperiodid = req.body.payrollperiod._id;
    const hours = req.body.hours;

    UserTimeTaken.find({user: userid, timetype: timetypeid, payrollperiod: payrollperiodid})
    .then(usertimetaken => {

        if (usertimetaken.length){
            usertimetaken.hours = hours;

            usertimetaken.save()
            .then(() => res.json('Existing User Time Taken Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        } else {
            const newUserTimeTaken = new UserTimeTaken({
                userid, 
                timetypeid,
                payrollperiodid,
                hours 
            });
        
            newUserTimeTaken.save()
            .then(() => res.json('User Time Type Added'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    UserTimeTaken.findById(req.params.id)
    .then(usertimetaken => res.json(usertimetaken))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    UserTimeTaken.findById(req.params.id)
    .then(usertimetaken => 
        {
            usertimetaken.user = req.body.user;
            usertimetaken.timetype = req.body.timetype;
            usertimetaken.payrollperiod = req.body.payrollperiod;
            usertimetaken.hours = req.body.hours;

            usertimetaken.save()
            .then(() => res.json('User Time Taken Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    TimeType.findByIdAndDelete(req.param.id)
    .then(() => res.json("User Time Taken Deleted!"))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/deleteall').delete((req, res) =>{
    //deletes all records from collection
    deleteAll();
});

router.route('/initialize').post((req, res) => {
    
    deleteAll();
    if (res.headersSent) return;
    addTimeType(res, 'VACTIM0001', 'Vacation');
    if (res.headersSent) return;
    addTimeType(res, 'SICTIM0001', 'Sick');
    if (res.headersSent) return;
    addTimeType(res, 'PERTIM0001', 'Personal');
    if (res.headersSent) return;
    res.json("Data Initialized!");
});

function addTimeType(res, timetypecode, timetypename){
    const newTimeType = new TimeType({
        timetypecode, 
        timetypename
    });

    newTimeType.save()
    .then()
    .catch(err => res.status(400).json('Error: ' + err));
}

function deleteAll(res){
    TimeType.deleteMany({})
    .then()
    .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = router;