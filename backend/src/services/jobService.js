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

module.exports = {
    createJob,
};