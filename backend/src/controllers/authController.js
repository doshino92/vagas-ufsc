const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    if (!["candidate", "recruiter"].includes(role)) {
        return res.status(400).json({ message: "Papel inválido" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
        return res.status(409).json({ message: "E-mail já cadastrado" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role });

    const token = generateToken(user);

    res.status(201).json({
        token,
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = generateToken(user);

    res.json({
        token,
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
};

const me = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(user);
};

module.exports = { register, login, me };
