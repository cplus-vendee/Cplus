const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const Deals = require("../model/deals");


// pour creer un objet produit
router.post("/", auth, async (req, res) => {
        const montant = req.body.montant;
        const vendeur = req.body.vendeur;
        const acheteur = req.body.acheteur;
        const date = (new Date()).toISOString()

        const new_deal = new Deals({
            montant: montant,
            vendeur: vendeur,
            acheteur: acheteur,
            date: date
        })

        await new_deal.save()
        res.json(new_deal)
        return
    }
);

// retourne toute la liste
router.get("/list", auth, async (req, res) => {
    const from = req.body.from;
    const to = req.body.to;
    try {
        const deals = await Deals.find();
        var dealsToShow = []
        deals.forEach(deal => {
            if ( from < deals.date < to ){
                dealsToShow.push(deal)
            }
        });
        res.json(dealsToShow);
    } catch (e) {
        res.json("Error in Fetching Product");
    }
});

router.post("/list/from/to", auth, async (req, res) => {
    try {
        const deals = await Deals.find();
        res.json(deals);
    } catch (e) {
        res.json("Error in Fetching Product");
    }
});

// retourne l'objet en fonction du nom 
// router.get("/immatriculation", auth, async (req, res) => {
//     const immatriculation = req.body.immatriculation;
//     try {
//         const vehicule = await Vehicule.findOne({ immatriculation: immatriculation });
//         res.json(vehicule);
//     } catch (e) {
//         res.json("Error in Fetching Product");
//     }
// });

// router.patch('/', auth, async (req, res) => {
//     const id = req.body.id;
//     const vehicule = await Vehicule.findOne({ id: id })

//     const modele = req.body.modele;
//     const immatriculation = req.body.immatriculation;
//     const capacite_min = req.body.capacite_min;
//     const capacite_max = req.body.capacite_max;
//     const capacite_actuelle = req.body.capacite_actuelle;
//     const type = req.body.type;

//     if (modele) {
//         vehicule.modele = modele;
//     }
//     if (immatriculation) {
//         vehicule.immatriculation = immatriculation;
//     }
//     if (capacite_min) {
//         vehicule.capacite_min = capacite_min;
//     }
//     if (capacite_max) {
//         vehicule.capacite_max = capacite_max;
//     }
//     if (capacite_actuelle) {
//         vehicule.capacite_actuelle = capacite_actuelle;
//     }
//     if (type) {
//         vehicule.type = type;
//     }

//     try {
//         await vehicule.save() // on sauvegarde les modification
//         res.json(vehicule)
//     } catch (e) {
//         res.json("Error in Fetching Product");
//     }
// })

// router.delete("/", auth, async (req, res) => {
//     const id = req.body.id;
//     try {
//         const vehicule = await Vehicule.deleteOne({ id: id });
//         res.json("true");
//     } catch (e) {
//         res.json("Error in Fetching Product");
//     }
// });

module.exports = router;