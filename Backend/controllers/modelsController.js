const Model = require('../models/model'); // Import your Mongoose model

// Get all models
const getAllModels = async (req, res) => {
  try {
    const models = await Model.find();
    res.status(200).json(models);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a model
const createModel = async (req, res) => {
  try {
    const newModel = new Model(req.body);
    const savedModel = await newModel.save();
    res.status(201).json(savedModel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a model
const updateModel = async (req, res) => {
  try {
    const updatedModel = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedModel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a model
const deleteModel = async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Model deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllModels,
  createModel,
  updateModel,
  deleteModel,
};
