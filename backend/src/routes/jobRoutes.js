const express = require("express");
const {
    createJobController,
    getAllJobsController,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/", createJobController);
router.get("/", getAllJobsController);

module.exports = router;