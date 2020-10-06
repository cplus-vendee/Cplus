const mongoose = require("mongoose");

const VehiculeSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    modele: {
        type: String,
        required: true
    },
    immatriculation: {
        type: String,
        required: true
    },
    capacite_max: {
        type: Number,
        required: true
    },
    capacite_min: {
        type: Number,
        required: true
    },
    capacite_actuelle: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: false
    }
    
});

// export model user with UserSchema
module.exports = mongoose.model("vehicule", VehiculeSchema);