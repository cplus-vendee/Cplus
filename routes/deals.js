const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const Deals = require("../model/deals");


// pour creer un objet produit
router.post("/", auth, async (req, res) => {
        const token = req.header("token");
        const decoded = jwt.verify(token, "secret");
        console.log(decoded.user.id)

        const montant = req.body.montant;
        const vendeur = decoded.user.id;
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

    try {
        const deals = await Deals.find();
        res.json(deals);
    } catch (e) {
        res.json("Error in Fetching Product");
    }
});

router.post("/list/from/to", auth, async (req, res) => {
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


module.exports = router;