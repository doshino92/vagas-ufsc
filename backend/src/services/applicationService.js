const Application = require("../models/Application");
const Notification = require("../models/Notification");
const Job = require("../models/Job");
const User = require("../models/User");

const applyToJob = async ({ jobId, candidateId }) => {
    const existing = await Application.findOne({ jobId, candidateId });
    if (existing) {
        const error = new Error("Você já se candidatou a esta vaga.");
        error.status = 409;
        throw error;
    }

    const [application, job, candidate] = await Promise.all([
        Application.create({ jobId, candidateId }),
        Job.findById(jobId).select("title recruiterId"),
        User.findById(candidateId).select("name"),
    ]);

    if (job?.recruiterId) {
        await Notification.create({
            userId: job.recruiterId,
            message: `${candidate?.name ?? "Um candidato"} se candidatou à vaga "${job.title}".`,
        });
    }

    return application;
};

const getMyApplications = async (candidateId) => {
    const applications = await Application.find({ candidateId })
        .populate("jobId", "title location description")
        .sort({ createdAt: -1 });
    return applications;
};

const getJobApplications = async ({ jobId, recruiterId }) => {
    // Garante que o recrutador é dono da vaga
    const job = await Job.findById(jobId);
    if (!job) {
        const error = new Error("Vaga não encontrada.");
        error.status = 404;
        throw error;
    }
    if (job.recruiterId.toString() !== recruiterId.toString()) {
        const error = new Error("Acesso negado.");
        error.status = 403;
        throw error;
    }

    const applications = await Application.find({ jobId })
        .populate("candidateId", "name email")
        .sort({ createdAt: -1 });
    return applications;
};

const STATUS_LABELS = {
    APPLIED: "Candidatura recebida",
    IN_REVIEW: "Em análise",
    INTERVIEW: "Entrevista agendada",
    REJECTED: "Não aprovado",
    APPROVED: "Aprovado",
};

const updateApplicationStatus = async ({ applicationId, status, recruiterId }) => {
    const application = await Application.findById(applicationId).populate("jobId");
    if (!application) {
        const error = new Error("Candidatura não encontrada.");
        error.status = 404;
        throw error;
    }

    if (application.jobId.recruiterId.toString() !== recruiterId.toString()) {
        const error = new Error("Acesso negado.");
        error.status = 403;
        throw error;
    }

    application.status = status;
    await application.save();

    // Cria notificação para o candidato
    const label = STATUS_LABELS[status] || status;
    await Notification.create({
        userId: application.candidateId,
        message: `O status da sua candidatura para "${application.jobId.title}" foi atualizado para: ${label}.`,
    });

    return application;
};

module.exports = {
    applyToJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus,
};
