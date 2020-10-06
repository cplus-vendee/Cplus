const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
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
        required: true
    },
    type: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    naissance: {
        type: String,
        required: true
    }
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);