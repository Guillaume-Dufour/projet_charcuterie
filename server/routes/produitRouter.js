const express = require('express');
const router = express.Router();
const produitCtrl = require('../controllers/produitController');
const Produit = require('../models/produit')

router.route('/')
    .get(produitCtrl.liste)

router.route('/:id_produit')
    .get(async (req, res) => {
        const produit = await Produit.getProduitById(req.params.id_produit);
        res.status(200).json(produit);
    })

module.exports = router;
