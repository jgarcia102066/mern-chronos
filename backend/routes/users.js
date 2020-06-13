const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/all').post((req, res) => {
    User.find({useractive: true})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const usercode = req.body.usercode;
    const departmentcode = req.body.departmentcode;
    const useractive = Boolean(req.body.useractive);

    User.find({usercode: req.body.usercode})
    .then(user => {

        if (user.length){
            user.username = username;
            user.departmentcode = departmentcode;
            user.useractive = useractive;

            user.save()
            .then(() => res.json('Existing User Activated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        } else {
            const newUser = new User({
                usercode, 
                username, 
                departmentcode,
                useractive
            });
        
            newUser.save()
            .then(() => res.json('User Added'))
            .catch(err => res.status(400).json('Error: ' + err));
        }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
    .then(user => 
        {
            user.usercode = req.body.usercode;
            user.username = req.body.username;
            user.departmentcode = req.body.departmentcode;
            user.useractive = Boolean(req.body.useractive);

            user.save()
            .then(() => res.json('User Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
    //not a true delete, only making active status false
    User.findById(req.param.id)
    .then(user => {
        user.departmentactive = false;

        user.save()
        .then(() => res.json('User Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/deleteall').delete((req, res) =>{
    //deletes all records from collection
    deleteAll();
});

router.route('/initialize').post((req, res) => {
    
    deleteAll();
    if (res.headersSent) return;
    addUser(res, '000000001','Michelle', '000010', true);
    //addUser(res, 'GSD10', 'Account Service', true);
    if (res.headersSent) return;
    addUser(res, '000000002','Marty', '000020', true);
    //addUser(res, 'GSD20', 'Accounting', true);
    if (res.headersSent) return;
    addUser(res, '000000003','Marci', '000030', true);
    //addUser(res, 'GSD30', 'HR', true);
    if (res.headersSent) return;
    addUser(res, '000000004','Loretta', '000040', true);
    //addUser(res, 'GSD40', 'IT', true);
    if (res.headersSent) return;
    addUser(res, '000000005','Yolanda', '000050', true);
    //addUser(res, 'GSD50', 'Media', true);
    if (res.headersSent) return;
    addUser(res, '000000006','Anne', '000060', true);
    //addUser(res, 'GSD60', 'Studio Services', true);
    if (res.headersSent) return;
    res.json("Data Initialized!");
});

function addUser(res, usercode, username, departmentcode, useractive){
    const newUser = new User({
        usercode, 
        username,
        departmentcode, 
        useractive
    });
    newUser.save()
    .then()
    .catch(err => res.status(400).json('Error: ' + err));
}

function deleteAll(res){
    User.deleteMany({})
    .then()
    .catch(err => res.status(400).json('Error: ' + err));
}


module.exports = router;