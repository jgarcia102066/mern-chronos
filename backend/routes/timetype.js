const router = require('express').Router();
let TimeType = require('../models/timetype.model');

router.route('/').get((req, res) => {
    //returns all time types
    TimeType.find()
    .then(TimeTypes => res.json(TimeTypes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const timetypecode = req.body.timetypecode;
    const timetypename = req.body.timetypename;

    TimeType.find({timetypecode: req.body.timetypecode})
    .then(timetype => {

        if (timetype.length){
            timetype.timetypename = req.body.timetypename;

            timetype.save()
            .then(() => res.json('Existing Time Type Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        } else {
            const newTimeType = new TimeType({
                timetypecode, 
                timetypename 
            });
        
            newTimeType.save()
            .then(() => res.json('Time Type Added'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    TimeType.findById(req.params.id)
    .then(timetype => res.json(timetype))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    TimeType.findById(req.params.id)
    .then(timetype => 
        {
            timetype.timetypecode = req.body.timetypecode;
            TimeType.timetypename = req.body.timetypename;

            TimeType.save()
            .then(() => res.json('Time Type Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    TimeType.findByIdAndDelete(req.param.id)
    .then(() => res.json("Time Type Deleted!"))
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