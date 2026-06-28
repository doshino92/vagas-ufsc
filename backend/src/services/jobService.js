const mongoose = require("mongoose");
const Job = require("../models/Job");

const createJob = async (data) => {
    return await Job.create(data);
};

const getAllJobs = async () => {
    return await Job.find().sort({ createdAt: -1 });
};

const getJobById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    return await Job.findById(id);
};

const updateJob = async (id, data) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    return await Job.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};

const deleteJob = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    return await Job.findByIdAndDelete(id);
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
};