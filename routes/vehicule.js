const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const Vehicule = require("../model/vehicule");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */


// pour creer un objet produit
router.post("/", auth, async (req, res) => {
    const modele = req.body.modele;
    const immatriculation = req.body.immatriculation;
    const capacite_min = req.body.capacite_min;
    const capacite_max = req.body.capacite_max;
    const capacite_actuelle = req.body.capacite_actuelle;
    const type = req.body.type;
    const id = Date.now();

    const new_vehicule = new Vehicule({
        id: id,
        modele: modele,
        immatriculation: immatriculation,
        capacite_min: capacite_min,
        capacite_max:capacite_max,
        capacite_actuelle: capacite_actuelle,
        type: type
    })

    await new_vehicule.save()
    res.json(new_vehicule)
    return
}
);

// retourne toute la liste
router.get("/vehicules", auth, async (req, res) => {
    try {
        const vehicule = await Vehicule.find();
        res.json(vehicule);
    } catch (e) {
        res.json("Error in Fetching Product");
    }
});

// retourne l'objet en fonction du nom 
router.get("/immatriculation", auth, async (req, res) => {
    const immatriculation = req.body.immatriculation;
    try {
        const vehicule = await Vehicule.findOne({ immatriculation: immatriculation });
        res.json(vehicule);
    } catch (e) {
        res.json("Error in Fetching Product");
    }
});

router.patch('/', auth, async (req, res) => {
    const id = req.body.id;
    const vehicule = await Vehicule.findOne({ id: id })

    const modele = req.body.modele;
    const immatriculation = req.body.immatriculation;
    const capacite_min = req.body.capacite_min;
    const capacite_max = req.body.capacite_max;
    const capacite_actuelle = req.body.capacite_actuelle;
    const type = req.body.type;

    if (modele) {
        vehicule.modele = modele;
    }
    if (immatriculation) {
        vehicule.immatriculation = immatriculation;
    }
    if (capacite_min) {
        vehicule.capacite_min = capacite_min;
    }
    if (capacite_max) {
        vehicule.capacite_max = capacite_max;
    }
    if (capacite_actuelle) {
        vehicule.capacite_actuelle = capacite_actuelle;
    }
    if (type) {
        vehicule.type = type;
    }

    try {
        await vehicule.save() // on sauvegarde les modification
        res.json(vehicule)
    } catch (e) {
        res.json("Error in Fetching Product");
    }
})

router.delete("/", auth, async (req, res) => {
    const id = req.body.id;
    try {
        const vehicule = await Vehicule.deleteOne({ id: id });
        res.json("true");
    } catch (e) {
        res.json("Error in Fetching Product");
    }
});

module.exports = router;