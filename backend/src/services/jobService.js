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

const getJobById = async (id) => {
    const job = await Job.findById(id);

    return job;
};

const updateJob = async (id, data) => {
    const updatedJob = await Job.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });

    return updatedJob;
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
};