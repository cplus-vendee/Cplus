const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");

// const User = require("../model/user");

// require("../model/user.js"); // register your schema

// var User= require('mongoose').model('User');

var User = require("../model/user.js") 
var User= require('mongoose').model('user');

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
    "/a1z2e3r4t5y6u7i8o9p10q", auth,
    [
        check("username", "Please Enter a Valid Username")
            .not()
            .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        console.log(check("email", "Please enter a valid email").isEmail());
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            email,
            password
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                username,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                expiresIn: '6d'
            },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
    "/login",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (!user)
                return res.status(200).json({
                    message: "User Not Exist"
                });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(200).json({
                    message: "Incorrect Password !"
                });

            const payload = {
                user: {
                    id: user._id
                }
            };

            jwt.sign(
                payload,
                "secret",
                {
                    expiresIn: '7d'
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token, user
                    });
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

// pour creer un objet utilisateur rapidement
router.post("/", auth, async (req, res) => {
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const password = "++AzeRty098";
    const type = req.body.type;
    const date = req.body.date;
    const numero = req.body.numero;
    const naissance = req.body.naissance;
    const tel = req.body.tel;
    const id = Date.now();

    const new_user = new User({
        id: id,
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
        type: type,
        tel: tel,
        date: date,
        numero: numero,
        naissance: naissance
    })

    const salt = await bcrypt.genSalt(10);
    new_user.password = await bcrypt.hash(password, salt);

    await new_user.save()
    res.json(new_user)
    return
}
);

router.patch('/', auth, async (req, res) => {
    const id = req.body.id;
    let password = req.body.password;
    let email = req.body.email;
    let user = await User.findOne({ email });
    console.log(email);
    console.log(user._id);
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        console.log(user.password);
        await user.save() // on sauvegarde les modification
        res.json(user)
    } catch (e) {
        res.json("Error in Fetching Product");
    }
})

// retourne toute la liste
router.get("/utilisateurs", async (req, res) => { //, auth
    try {
        const utilisateurs = await User.find();
        res.json(utilisateurs);
    } catch (e) {
        res.json("Error in Fetching Product");
    }
});

// retourne toute la liste en fonction du type
router.get("/utilisateurs/type", auth, async (req, res) => {
    const type = req.body.type;
    try {
        const utilisateurs = await User.find({ type: type });
        res.json(utilisateurs);
    } catch (e) {
        res.json("Error in Fetching Product");
    }
});

// retourne l'objet en fonction de l'email 
router.get("/utilisateur/email", auth, async (req, res) => {
    const email = req.body.email;
    try {
        const utilisateur = await User.findOne({ email: email });
        res.json(utilisateur);
    } catch (e) {
        res.json("Error in Fetching Product");
    }
});

router.get("/me", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
});

router.put('/', auth, async (req, res) => {
    const id = req.body.id;
    const user = await User.findOne({ id: id })

    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const type = req.body.type;
    const tel = req.body.tel;
    const date = req.body.date;
    const numero = req.body.numero;
    const naissance = req.body.naissance;


    const new_user = new User({
        _id: user._id,
        id: id,
        nom: nom,
        prenom: prenom,
        email: email,
        password: password,
        type: type,
        tel: tel,
        date: date,
        numero: numero,
        naissance: naissance
    })

    try {
        await new_user.save() // on sauvegarde les modification
        res.json(new_user)
    } catch (e) {
        res.json("Error in Fetching Product");
    }
})

router.patch('/', auth, async (req, res) => {
    const id = req.body.id;
    const user = await User.findOne({ id: id })

    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const type = req.body.type;
    const tel = req.body.tel;
    const date = req.body.date;
    const numero = req.body.numero;
    const naissance = req.body.naissance;

    console.log(nom);
    console.log(prenom);
    console.log(email);
    console.log(type);
    console.log(tel);
    console.log(date);
    console.log(numero);
    console.log(naissance)
    if (prenom) {
        user.prenom = prenom;
    }
    if (nom) {
        user.nom = nom;
    }
    if (email) {
        user.email = email;
    }
    if (type) {
        user.type = type;
    }
    if (tel) {
        user.tel = tel;
    }
    if (date) {
        user.date = date;
    }
    if (numero) {
        user.numero = numero;
    }
    if (naissance) {
        user.naissance = naissance;
    }

    try {
        await user.save() // on sauvegarde les modification
        res.json(user)
    } catch (e) {
        res.json("Error in Fetching Product");
    }
})

router.delete("/", auth, async (req, res) => {
    const id = req.body.id;
    try {
        const utilisateur = await User.deleteOne({ id: id });
        res.json("true");
    } catch (e) {
        res.json("Error in Fetching Product");
    }
});

module.exports = router;