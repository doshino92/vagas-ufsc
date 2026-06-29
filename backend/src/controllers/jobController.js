const {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
} = require("../services/jobService");

const createJobController = async (req, res) => {
    try {
        const job = await createJob(req.body);

        return res.status(201).json(job);
    } catch (error) {
        console.error("Erro ao criar vaga:", error);

        return res.status(500).json({
            success: false,
            message: "Erro ao criar vaga.",
        });
    }
};

const getAllJobsController = async (req, res) => {
    try {
        const jobs = await getAllJobs();

        return res.status(200).json(jobs);
    } catch (error) {
        console.error("Erro ao buscar vagas:", error);

        return res.status(500).json({
            success: false,
            message: "Erro ao buscar vagas.",
        });
    }
};

const getJobByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await getJobById(id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Vaga não encontrada.",
            });
        }

        return res.status(200).json(job);
    } catch (error) {
        console.error("Erro ao buscar vaga:", error);

        return res.status(500).json({
            success: false,
            message: "Erro ao buscar vaga.",
        });
    }
};

const updateJobController = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedJob = await updateJob(id, req.body);

        if (!updatedJob) {
            return res.status(404).json({
                success: false,
                message: "Vaga não encontrada.",
            });
        }

        return res.status(200).json(updatedJob);
    } catch (error) {
        console.error("Erro ao atualizar vaga:", error);

        return res.status(500).json({
            success: false,
            message: "Erro ao atualizar vaga.",
        });
    }
};

const deleteJobController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedJob = await deleteJob(id);

        if (!deletedJob) {
            return res.status(404).json({
                success: false,
                message: "Vaga não encontrada.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Vaga removida com sucesso.",
            job: deletedJob,
        });
    } catch (error) {
        console.error("Erro ao remover vaga:", error);

        return res.status(500).json({
            success: false,
            message: "Erro ao remover vaga.",
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