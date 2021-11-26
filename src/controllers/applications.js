const { ObjectId } = require("mongoose").Types;
const Applications = require("../models/applications");

const getAll = (req, res) => {
  Applications.find()
    .then((applications) => res.status(200).json(applications))
    .catch((err) => res.status(400).json(err));
};

const getById = (req, res) => {
  Applications.findById({ _id: new ObjectId(req.params.id) })
    .then((application) => res.status(200).json(application))
    .catch((err) => res.status(400).json(err));
};

const create = (req, res) => {
  if (
    !req.body.idPosition
    || !req.body.idCandidate
    || !req.body.idInterview
    || !req.body.status
  ) {
    return res.status(400).json({ msg: "Some parameters are missing" });
  }
  const newApplication = {
    idPosition: new ObjectId(req.body.idPosition),
    idCandidate: new ObjectId(req.body.idCandidate),
    idInterview: new ObjectId(req.body.idInterview),
    result: req.body.result,
    status: req.body.status,
  };

  if (req.body.dateTime) newApplication.dateTime = new Date(req.body.dateTime);

  Applications.create(newApplication);
  return res.status(201).json(newApplication);
};

const update = (req, res) => {
  if (
    !req.params.id
    || !req.body.idPosition
    || !req.body.idCandidate
    || !req.body.idInterview
    || !req.body.status
  ) {
    return res.status(400).json({ msg: "Some parameters are missing" });
  }

  const updatedApplication = {
    idPosition: new ObjectId(req.body.idPosition),
    idCandidate: new ObjectId(req.body.idCandidate),
    idInterview: new ObjectId(req.body.idInterview),
    result: req.body.result,
    status: req.body.status,
  };

  if (req.body.dateTime) updatedApplication.dateTime = new Date(req.body.dateTime);

  return Applications.findByIdAndUpdate(
    new ObjectId(req.params.id),
    updatedApplication,
    { new: true },
    (err, applicationDoc) => {
      if (!applicationDoc) {
        return res.status(404).json({
          msg: `Application with id: ${req.params.id} was not found.`,
        });
      }
      if (err) return res.status(400).json(err);
      return res.status(200).json(applicationDoc);
    },
  );
};

const remove = (req, res) => {
  Applications.findByIdAndRemove(
    new ObjectId(req.params.id),
    (err, removedApplication) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json(removedApplication);
    },
  );
};

module.exports = {
  getAll,
  getById,
  update,
  create,
  remove,
};
