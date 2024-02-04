const express = require("express");
const cors = require("cors");

const syncDatabase = require("./configs/syncDatabase");

const { router: userRouter } = require("./routers/userRouter");
const { router: comidaRouter } = require("./routers/comidaRouter");

const app = express();

app.use(cors({ origin: "https://macros-rework.vercel.app" }));
// app.use(cors({ origin: "*" }));

app.use("/user", userRouter);
app.use("/comida", comidaRouter);

const port = 3000;

syncDatabase()
    .then(() => app.listen(port, () => console.log(`running on port ${port}`)));