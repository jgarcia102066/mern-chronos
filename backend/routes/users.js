const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const usercode = req.body.usercode;
    const departmentcode = req.body.departmentcode;
    const useractive = Boolean(req.body.useractive);

    let newUser = new User({usercode, username, departmentcode, useractive});

    newUser.save()
    .then(() => res.json('User Added'))
    .catch(err => res.status(400).json('Error: ' + err));
});




module.exports = router;