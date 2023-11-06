const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const User = require("./models/UserModel");
const Comida = require("./models/ComidaModel");

const { router: userRouter } = require("./routers/userRouter");
const { router: comidaRouter } = require("./routers/comidaRouter");

const app = express();

app.use(cors({ origin: "https://macros-rework.vercel.app", credentials: true }));
//app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/comida", comidaRouter);

const port = 3000;

User.sync()
    .then(() => {
        Comida.sync()
            .then(() => {
                app.listen(port, () => console.log(`running on port ${port}`));
        })
});