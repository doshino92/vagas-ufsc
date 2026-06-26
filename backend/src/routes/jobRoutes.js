const express = require("express");
const {
    createJobController,
    getAllJobsController,
    getJobByIdController,
    updateJobController,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/", createJobController);
router.get("/", getAllJobsController);
router.get("/:id", getJobByIdController);
router.put("/:id", updateJobController);

module.exports = router;