const Job = require("../models/Job");

const createJob = async ({ title, description, location, recruiterId }) => {
    const job = await Job.create({
        title,
        description,
        location,
        recruiterId,
    });

    return job;
};

const getAllJobs = async () => {
    const jobs = await Job.find().sort({ createdAt: -1 });

    return jobs;
};

module.exports = {
    createJob,
    getAllJobs,
};