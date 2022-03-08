const db = require('../models');

const User = db.users;
const { Op } = db.seq;
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  // Create a Tutorial
  const user = {
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
  };
    // Save Tutorial in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
                    err.message || 'Some error occurred while creating the User.',
      });
    });
};
// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};
