const express = require("express");
const cors = require("cors");

const User = require("./models/userModel");

const { router: userRouter } = require("./routers/userRouter");

const app = express();

app.use(cors({ origin: "*" }));

app.use("/user", userRouter);

const port = 3001;

User.sync()
    .then(() => {
        app.listen(port, () => console.log(`running on port ${port}`));
    });