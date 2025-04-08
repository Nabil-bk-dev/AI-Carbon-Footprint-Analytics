const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth"); // ✅ middleware ajouté

// ✅ Inscription
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).send({ message: "Un utilisateur avec cet email existe déjà." });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashedPassword }).save();

    res.status(201).send({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    res.status(500).send({ message: "Erreur interne du serveur." });
  }
});

// ✅ Route protégée pour récupérer l'email
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("email");
    if (!user) return res.status(404).send({ message: "Utilisateur non trouvé" });

    res.send({ email: user.email });
  } catch (error) {
    res.status(500).send({ message: "Erreur serveur" });
  }
});

module.exports = router;
