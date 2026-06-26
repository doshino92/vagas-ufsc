const { createJob, getAllJobs } = require("../services/jobService");

const createJobController = async (req, res) => {
    try {
        const { title, description, location, recruiterId } = req.body;

        const job = await createJob({
            title,
            description,
            location,
            recruiterId,
        });

        return res.status(201).json(job);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao criar vaga",
            error: error.message,
        });
    }
};

const getAllJobsController = async (req, res) => {
    try {
        const jobs = await getAllJobs();

        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar vagas",
            error: error.message,
        });
    }
};

module.exports = {
    createJobController,
    getAllJobsController,
};