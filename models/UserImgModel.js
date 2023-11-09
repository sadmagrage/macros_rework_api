const Mongoose = require("mongoose");
const { UUID } = require("sequelize");

const userImgSchema = new Mongoose.Schema({
    _id: {
        type: UUID
    },
    user_img: {
        type: Buffer
    }
});

const UserImg = Mongoose.model("user_img", userImgSchema);

module.exports = UserImg;