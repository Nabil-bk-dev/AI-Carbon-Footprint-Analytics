const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const postDB = require("./routes/seed");  // Import database connection
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

// Connect to database
connectDB();
//ajouter a la base de donnes 
//postDB();


const app = express();
app.use(cors());
app.use(express.json());

// Routes
const modelsRoutes = require("./routes/models");
app.use("/api/models", modelsRoutes);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
