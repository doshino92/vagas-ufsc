const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
    applyToJobController,
    getMyApplicationsController,
    getJobApplicationsController,
    updateApplicationStatusController,
} = require("../controllers/applicationController");

const router = express.Router();

// POST /api/jobs/:id/apply — candidato se candidata
router.post("/jobs/:id/apply", authMiddleware, applyToJobController);

// GET /api/applications/my — candidato vê suas candidaturas
router.get("/applications/my", authMiddleware, getMyApplicationsController);

// GET /api/jobs/:id/applications — recrutador vê candidatos da vaga
router.get("/jobs/:id/applications", authMiddleware, getJobApplicationsController);

// PUT /api/applications/:id/status — recrutador atualiza status
router.put("/applications/:id/status", authMiddleware, updateApplicationStatusController);

module.exports = router;
