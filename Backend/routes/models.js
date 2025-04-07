const express = require('express');
const router = express.Router();
const {
  getAllModels,
  createModel,
  updateModel,
  deleteModel,
} = require('../controllers/modelsController'); //  importing controller functions

// Define routes and use controllers
router.get('/', getAllModels);
router.post('/', createModel);
router.put('/:id', updateModel);
router.delete('/:id', deleteModel);

module.exports = router;
