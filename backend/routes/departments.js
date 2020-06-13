const router = require('express').Router();
let Department = require('../models/department.model');

router.route('/').get((req, res) => {
    //returns only active departments
    Department.find({departmentactive: true})
    .then(departments => res.json(departments))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/all').get((req, res) => {
    //returns all departments
    Department.find()
    .then(departments => res.json(departments))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const departmentcode = req.body.departmentcode;
    const departmentname = req.body.departmentname;
    const departmentactive = Boolean(req.body.departmentactive);

    Department.find({departmentcode: req.body.departmentcode})
    .then(department => {

        if (department.length){
            department.departmentname = req.body.departmentname;
            department.departmentactive = req.body.departmentactive;

            department.save()
            .then(() => res.json('Existing Department Activated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        } else {
            const newDepartment = new Department({
                departmentcode, 
                departmentname, 
                departmentactive
            });
        
            newDepartment.save()
            .then(() => res.json('Department Added'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Department.findById(req.params.id)
    .then(department => res.json(department))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Department.findById(req.params.id)
    .then(department => 
        {
            department.departmentcode = req.body.departmentcode;
            department.departmentname = req.body.departmentname;
            department.departmentactive = Boolean(req.body.departmentactive);

            department.save()
            .then(() => res.json('Department Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    //not a true delete, only making active status false
    Department.findById(req.param.id)
    .then(department => {
        department.departmentactive = false;

        department.save()
        .then(() => res.json('Department Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;