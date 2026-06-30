const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
    getMyNotificationsController,
    markAsReadController,
} = require("../controllers/notificationController");

const router = express.Router();

// GET /api/notifications — lista notificações do usuário
router.get("/", authMiddleware, getMyNotificationsController);

// PATCH /api/notifications/:id/read — marca como lida
router.patch("/:id/read", authMiddleware, markAsReadController);

module.exports = router;
