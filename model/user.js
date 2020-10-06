const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    id: {
        type: Number,
        required: false
    },
    nom: {
        type: String,
        required: false
    },
    prenom: {
        type: String,
        required: false
    },
    tel: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    numero: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    naissance: {
        type: String,
        required: false
    }
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);