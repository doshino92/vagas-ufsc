const express = require("express");
const {
    createJobController,
    getAllJobsController,
    getJobByIdController,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/", createJobController);
router.get("/", getAllJobsController);
router.get("/:id", getJobByIdController);

module.exports = router;