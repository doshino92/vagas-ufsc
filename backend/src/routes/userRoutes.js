const express = require("express");
const router = express.Router();
const { updateMe } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.put("/me", authMiddleware, updateMe);

module.exports = router;
