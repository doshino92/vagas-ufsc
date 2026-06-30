const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "O título da vaga é obrigatório."],
            trim: true,
            minlength: 3,
            maxlength: 150,
        },

        company: {
            type: String,
            required: [true, "A empresa é obrigatória."],
            trim: true,
            minlength: 2,
            maxlength: 120,
        },

        location: {
            type: String,
            required: [true, "A localização é obrigatória."],
            trim: true,
            maxlength: 120,
        },

        salary: {
            type: String,
            required: [true, "O salário é obrigatório."],
            trim: true,
            maxlength: 60,
        },

        type: {
            type: String,
            required: [true, "O tipo da vaga é obrigatório."],
            trim: true,
            enum: [
                "CLT",
                "PJ",
                "Estágio",
                "Temporário",
                "Freelancer",
                "Bolsa",
                "Aprendiz",
                "Outro",
            ],
        },

        modality: {
            type: String,
            required: [true, "A modalidade é obrigatória."],
            trim: true,
            enum: [
                "Presencial",
                "Remoto",
                "Híbrido",
            ],
        },

        description: {
            type: String,
            required: [true, "A descrição é obrigatória."],
            trim: true,
            minlength: 10,
            maxlength: 5000,
        },

        recruiterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Job", jobSchema);