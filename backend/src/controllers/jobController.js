const {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
} = require("../services/jobService");

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

const getJobByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await getJobById(id);

        if (!job) {
            return res.status(404).json({
                message: "Vaga não encontrada",
            });
        }

        return res.status(200).json(job);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao buscar vaga",
            error: error.message,
        });
    }
};

const updateJobController = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedJob = await updateJob(id, req.body);

        if (!updatedJob) {
            return res.status(404).json({
                message: "Vaga não encontrada",
            });
        }

        return res.status(200).json(updatedJob);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar vaga",
            error: error.message,
        });
    }
};

const deleteJobController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedJob = await deleteJob(id);

        if (!deletedJob) {
            return res.status(404).json({
                message: "Vaga não encontrada",
            });
        }

        return res.status(200).json({
            message: "Vaga removida com sucesso",
            job: deletedJob,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao remover vaga",
            error: error.message,
        });
    }
};

module.exports = {
    createJobController,
    getAllJobsController,
    getJobByIdController,
    updateJobController,
    deleteJobController,
};