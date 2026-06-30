const bcrypt = require("bcryptjs");
const User = require("../models/User");

const updateMe = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    try {
        await user.save();
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: "Este e-mail já está em uso" });
        }
        throw err;
    }

    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
};

module.exports = { updateMe };
