const mongoose = require("mongoose");
const Job = require("../models/Job");

const createJob = async (data) => {
    return await Job.create(data);
};

const getAllJobs = async () => {
    return await Job.find({})
        .sort({ createdAt: -1 })
        .lean();
};

const getJobById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    return await Job.findById(id).lean();
};

const updateJob = async (id, data) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    return await Job.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
    }).lean();
};

const deleteJob = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    return await Job.findByIdAndDelete(id).lean();
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
};