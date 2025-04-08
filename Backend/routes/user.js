const router = require("express").Router(); // ✅ avec les parenthèses
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).send({ message: "Un utilisateur avec cet email existe déjà." }); // ✅ avec return
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashedPassword }).save();

    res.status(201).send({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    res.status(500).send({ message: "Erreur interne du serveur." });
  }
});

module.exports = router; // ✅ export du routeur
