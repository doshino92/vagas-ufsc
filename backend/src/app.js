const express = require("express");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API do Vagas UFSC funcionando" });
});

app.use("/api/jobs", jobRoutes);

module.exports = app;