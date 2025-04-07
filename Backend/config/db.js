const mongoose = require("mongoose");
require("dotenv").config(); // Charger les variables d'environnement

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connexion à MongoDB Atlas réussie");
  } catch (err) {
    console.error("❌ Erreur de connexion à MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
