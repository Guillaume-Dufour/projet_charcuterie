const db = require('../config/db');

class Produit {

    static create(data) {
        return new Promise((resolve, reject) =>  {
            const requete = "INSERT INTO produit SET ?";

            db.query(requete, data, (err, result) => {
                if (err)
                    reject(err)
                else
                    resolve(result);
            })
        })
    }

    static getAllProduits() {
        return new Promise((resolve, reject) => {
            const requete = "SELECT * " +
                "FROM produit p " +
                "JOIN type_produit t ON t.id_type_produit=p.id_type_produit " +
                "ORDER BY p.libelle_produit";

            db.query(requete, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        })
    }

    static getAllProduitsDispo() {
        return new Promise((resolve, reject) => {
            const requete = "SELECT * " +
                "FROM produit p " +
                "JOIN type_produit t ON t.id_type_produit=p.id_type_produit AND p.est_dispo=1 " +
                "ORDER BY p.libelle_produit";

            db.query(requete, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        })
    }

    static getProduitsDispoByType(id_type_produit) {
        return new Promise((resolve, reject) => {
            const requete = "SELECT * " +
                "FROM produit p " +
                "JOIN type_produit t ON t.id_type_produit=p.id_type_produit AND p.est_dispo=1 AND t.id_type_produit = ? " +
                "ORDER BY p.libelle_produit";

            db.query(requete, [id_type_produit], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        })
    }

    static getProduitById(id_produit) {
        return new Promise((resolve, reject) => {
            const requete = "SELECT * " +
                "FROM produit p " +
                "JOIN type_produit t ON t.id_type_produit=p.id_type_produit AND p.id_produit = ?";

            db.query(requete, [id_produit], (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result[0]);
            });
        })
    }

    static updateDispo(id_produit, value) {
        return new Promise((resolve, reject) => {
            const requete = "UPDATE produit SET est_dispo = ? WHERE id_produit = ?";

            db.query(requete, [value, id_produit], (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            })
        })
    }

    static updateProduit(id_produit, data) {
        return new Promise((resolve, reject) => {
            const requete = "UPDATE produit " +
                "SET libelle_produit = ?, " +
                "id_type_produit = ?, " +
                "prix_produit = ?, " +
                "poids_produit = ?, " +
                "provenance_produit = ?, " +
                "est_bio = ?, " +
                "gencod_produit = ? " +
                "WHERE id_produit = ?";

            db.query(requete, [
                data.libelle_produit,
                data.id_type_produit,
                data.prix_produit,
                data.poids_produit,
                data.provenance_produit,
                data.est_bio,
                data.gencod_produit,
                id_produit
                ],
                (err, result) => {
                        if (err)
                            reject(err);
                        else
                            resolve(result);
            })
        })
    }
}

module.exports = Produit;
