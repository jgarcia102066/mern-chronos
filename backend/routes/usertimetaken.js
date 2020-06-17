const router = require('express').Router();
let UserTimeTaken = require('../models/usertimetaken.model');
const { isValidObjectId } = require('mongoose');


router.route('/').get((req, res) => {
    //returns all time types
    UserTimeTaken.find().populate('user').populate('timetype').populate('payrollperiod')
    .then(usertimetaken => res.json(usertimetaken))
    .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/add').post((req, res) => {
    const user = req.body.user;
    const timetype = req.body.timetype;
    const payrollperiod = req.body.payrollperiod;
    const hours = req.body.hours;
    
    UserTimeTaken.find({user: user, timetype: timetype, payrollperiod: payrollperiod}).populate('user','_id').populate('timetype','_id').populate('payrollperiod','_id')
    .then(usertimetaken => {

        if (usertimetaken.length){
            usertimetaken.hours = hours;
            usertimetaken.save()
            .then(() => res.json('Existing User Time Taken Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        } else {
            const newUserTimeTaken = new UserTimeTaken({
                user,
                timetype,
                payrollperiod,
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
    UserTimeTaken.findById(req.params.id).populate('user','_id').populate('timetype','_id').populate('payrollperiod','_id')
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
    UserTimeTaken.findByIdAndDelete(req.param.id)
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
    const newTimeType = new UserTimeTaken({
        timetypecode, 
        timetypename
    });

    newTimeType.save()
    .then()
    .catch(err => res.status(400).json('Error: ' + err));
}

function deleteAll(res){
    UserTimeTaken.deleteMany({})
    .then()
    .catch(err => res.status(400).json('Error: ' + err));
}

module.exports = router;