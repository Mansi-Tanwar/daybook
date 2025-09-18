const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.get("/me", authMiddleware, userController.viewProfile);
router.put("/me", authMiddleware, userController.updateProfile);

router.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});


module.exports = router;
