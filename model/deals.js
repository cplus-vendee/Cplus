const mongoose = require("mongoose");

const DealsSchema = mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    montant: {
        type: Number,
        required: true
    },
    vendeur: {
        type: String,
        required: true
    },
    acheteur: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

// export model user with UserSchema
module.exports = mongoose.model("deals", DealsSchema);