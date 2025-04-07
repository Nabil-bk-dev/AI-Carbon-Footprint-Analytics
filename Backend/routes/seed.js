const mongoose = require("mongoose");
require("dotenv").config(); // Charger les variables d'environnement

const mongoURI = process.env.MONGO_URI;

const postDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connexion à MongoDB Atlas réussie");

    // Your seed logic here
    const Model = require('../models/model'); // Assuming your model path
    const seedData = [
      {
        name: "Stable Diffusion",
        provider: "Stability AI",
        energyConsumption: 256.8,
        co2Emissions: 72.4,
        datacenterLocation: { lat: 51.5074, lng: -0.1278, country: "UK" },
        parameters: { modelSize: "1.5B", trainingTime: 72, batchSize: 256, epochs: 50, hardwareType: "NVIDIA A6000" },
        metrics: { accuracy: 0.92, inferenceTime: 180 },
      },
      {
        name: "GPT-4",
        provider: "OpenAI",
        energyConsumption: 500,
        co2Emissions: 120,
        datacenterLocation: { lat: 37.7749, lng: -122.4194, country: "USA" },
        parameters: { modelSize: "175B", trainingTime: 150, batchSize: 512, epochs: 100, hardwareType: "V100" },
        metrics: { accuracy: 0.93, inferenceTime: 250 },
      },
      {
        name: "BERT",
        provider: "Google AI",
        energyConsumption: 350.5,
        co2Emissions: 80.3,
        datacenterLocation: { lat: 34.0522, lng: -118.2437, country: "USA" },
        parameters: { modelSize: "110M", trainingTime: 50, batchSize: 128, epochs: 30, hardwareType: "TPU" },
        metrics: { accuracy: 0.91, inferenceTime: 140 },
      },
      {
        name: "CLIP",
        provider: "OpenAI",
        energyConsumption: 420.7,
        co2Emissions: 110.5,
        datacenterLocation: { lat: 40.7128, lng: -74.0060, country: "USA" },
        parameters: { modelSize: "400M", trainingTime: 120, batchSize: 256, epochs: 80, hardwareType: "NVIDIA A100" },
        metrics: { accuracy: 0.94, inferenceTime: 160 },
      },
      {
        name: "DALL·E 2",
        provider: "OpenAI",
        energyConsumption: 380.2,
        co2Emissions: 100.5,
        datacenterLocation: { lat: 34.0522, lng: -118.2437, country: "USA" },
        parameters: { modelSize: "3B", trainingTime: 150, batchSize: 128, epochs: 70, hardwareType: "NVIDIA V100" },
        metrics: { accuracy: 0.91, inferenceTime: 180 },
      },
      {
        name: "T5",
        provider: "Google AI",
        energyConsumption: 310.9,
        co2Emissions: 95.6,
        datacenterLocation: { lat: 37.7749, lng: -122.4194, country: "USA" },
        parameters: { modelSize: "11B", trainingTime: 130, batchSize: 64, epochs: 90, hardwareType: "TPU" },
        metrics: { accuracy: 0.92, inferenceTime: 200 },
      },
      {
        name: "XLNet",
        provider: "Google AI",
        energyConsumption: 280.4,
        co2Emissions: 75.1,
        datacenterLocation: { lat: 37.7749, lng: -122.4194, country: "USA" },
        parameters: { modelSize: "340M", trainingTime: 45, batchSize: 128, epochs: 50, hardwareType: "TPU" },
        metrics: { accuracy: 0.93, inferenceTime: 160 },
      },
      {
        name: "RoBERTa",
        provider: "Facebook AI",
        energyConsumption: 310.0,
        co2Emissions: 85.9,
        datacenterLocation: { lat: 40.7306, lng: -73.9352, country: "USA" },
        parameters: { modelSize: "355M", trainingTime: 75, batchSize: 256, epochs: 60, hardwareType: "NVIDIA A100" },
        metrics: { accuracy: 0.94, inferenceTime: 170 },
      },
      {
        name: "Megatron",
        provider: "NVIDIA",
        energyConsumption: 500.3,
        co2Emissions: 130.7,
        datacenterLocation: { lat: 48.8566, lng: 2.3522, country: "France" },
        parameters: { modelSize: "175B", trainingTime: 200, batchSize: 128, epochs: 120, hardwareType: "NVIDIA A100" },
        metrics: { accuracy: 0.96, inferenceTime: 220 },
      }
      // Add more objects here
    ];

    await Model.deleteMany(); // Clear previous data (optional)

    const result = await Model.insertMany(seedData); // Insert new seed data
    console.log(`✅ Data inserted: ${result.length} records`);
  } catch (err) {
    console.error("❌ Erreur de connexion à MongoDB:", err);
    process.exit(1);
  }
};


module.exports = postDB;
