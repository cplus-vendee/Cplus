const mongoose = require("mongoose");

const DealsSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    montant: {
        type: String,
        required: true
    },
    vendeur: {
        type: String,
        required: true
    },
    acheteur: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

// export model user with UserSchema
module.exports = mongoose.model("deals", DealsSchema);