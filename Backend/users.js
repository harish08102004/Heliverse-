const router = require('express').Router();
const User = require('./user.model');

// Get all users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
