const {
    applyToJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus,
} = require("../services/applicationService");

const applyToJobController = async (req, res) => {
    try {
        const jobId = req.params.id;
        const candidateId = req.user.id;

        if (req.user.role !== "candidate") {
            return res.status(403).json({ message: "Apenas candidatos podem se candidatar." });
        }

        const application = await applyToJob({ jobId, candidateId });
        return res.status(201).json(application);
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message });
    }
};

const getMyApplicationsController = async (req, res) => {
    try {
        const applications = await getMyApplications(req.user.id);
        return res.json(applications);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getJobApplicationsController = async (req, res) => {
    try {
        const applications = await getJobApplications({
            jobId: req.params.id,
            recruiterId: req.user.id,
        });
        return res.json(applications);
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message });
    }
};

const updateApplicationStatusController = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ["APPLIED", "IN_REVIEW", "INTERVIEW", "REJECTED", "APPROVED"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Status inválido." });
        }

        if (req.user.role !== "recruiter") {
            return res.status(403).json({ message: "Apenas recrutadores podem atualizar o status." });
        }

        const application = await updateApplicationStatus({
            applicationId: req.params.id,
            status,
            recruiterId: req.user.id,
        });
        return res.json(application);
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message });
    }
};

module.exports = {
    applyToJobController,
    getMyApplicationsController,
    getJobApplicationsController,
    updateApplicationStatusController,
};
