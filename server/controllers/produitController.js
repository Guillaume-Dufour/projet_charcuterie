const Produit = require('../models/produit');

module.exports = {
    create: (req, res) => {

    },

    update: (req, res) => {

    },

    update_dispo: (req, res) => {

    },

    liste: (req, res) => {
        Produit.getAllProduits()
            .then(produits => {
                return res.status(200).json({
                    produits
                })
            })
            .catch(error => {
                return res.status(300).json({
                    error
                })
            })
    },

    details: (req, res) => {

    }
}
