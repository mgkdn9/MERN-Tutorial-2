const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require('../middleware/authMiddleware')

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe); //the protect method being based is what checks that someone has logged in/just registered

module.exports = router;
