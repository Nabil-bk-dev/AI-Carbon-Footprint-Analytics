const router = require("express").Router();
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt"); // ✅ Ajouté ici

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    const validePassword = await bcrypt.compare(req.body.password, user.password);
    if (!validePassword) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged Successfully" });

  } catch (error) {
    console.error("Erreur dans /api/auth :", error); // ✅ Log utile
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password")
  });
  return schema.validate(data);
};

module.exports = router;
