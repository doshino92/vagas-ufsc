const express = require("express");
const {
    createJobController,
    getAllJobsController,
    getJobByIdController,
    updateJobController,
    deleteJobController,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/", createJobController);
router.get("/", getAllJobsController);
router.get("/:id", getJobByIdController);
router.put("/:id", updateJobController);
router.delete("/:id", deleteJobController);

module.exports = router;