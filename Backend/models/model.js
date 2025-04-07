const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  energyConsumption: { type: Number, required: true },
  co2Emissions: { type: Number, required: true },
  datacenterLocation: {
    lat: { type: Number },
    lng: { type: Number },
    country: { type: String }
  },
  parameters: {
    modelSize: { type: String },
    trainingTime: { type: Number },
    batchSize: { type: Number },
    epochs: { type: Number },
    hardwareType: { type: String }
  },
  metrics: {
    accuracy: { type: Number },
    inferenceTime: { type: Number }
  }
});

const Model = mongoose.model('Model', modelSchema);

module.exports = Model;
