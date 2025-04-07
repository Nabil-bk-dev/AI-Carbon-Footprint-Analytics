const express = require('express');
const router = express.Router();
const Model = require('../models/model'); // Assure-toi que le modèle est bien défini

// Route POST pour ajouter un modèle
router.post('/', (req, res) => {
  const { name, provider, energyConsumption, co2Emissions, datacenterLocation, parameters, metrics } = req.body;

  const newModel = new Model({
    name,
    provider,
    energyConsumption,
    co2Emissions,
    datacenterLocation,
    parameters,
    metrics,
  });

  newModel.save()
    .then((model) => res.json(model))
    .catch((err) => res.status(400).json('Erreur: ' + err));
});

module.exports = router;
