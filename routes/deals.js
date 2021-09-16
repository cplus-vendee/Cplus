const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

const Deals = require("../model/deals");
var ObjectId = require('mongoose').Types.ObjectId; 


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


router.delete("/:id", auth, async (req, res) => {
    const token = req.header("token");
    const decoded = jwt.verify(token, "secret");
    // console.log(decoded.user.id)
    console.log("delete")

    const idToDelete = req.params.id;
    const vendeur = decoded.user.id;

    try {
        console.log(idToDelete)
        console.log(vendeur)
        let deal = await Deals.findOne({
            _id : new ObjectId(idToDelete),
            vendeur: vendeur
        });

        console.log(deal)

        if(deal._id){
            await Deals.deleteOne({
                _id : new ObjectId(deal._id)
            });
        }

        res.json("deleted")
        return

    } catch (error) {
        res.json("Error in Fetching Product");
        return
    }
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
    const from = new Date(req.body.from);
    const to = new Date(req.body.to);
    try {
        const deals = await Deals.find();
        var dealsToShow = []
        deals.forEach(deal => {
            console.log(from)
            var dealDate = new Date(deal.date.substring(0,10));
            console.log(new Date(deal.date.substring(0,10)))
            console.log(to)
            if (dealDate > from && dealDate <= to){
                console.log("yes")
                dealsToShow.push(deal)
            }
        });
        console.log(dealsToShow)
        res.json(dealsToShow);
    } catch (e) {
        console.log(e)
        res.json("Error in Fetching Product");
    }
});


module.exports = router;