const db = require('../config/db');

class ProduitFavori {

    static create(data) {
        return new Promise((resolve, reject) =>  {
            const requete = "INSERT INTO produit_favori SET ?";

            db.query(requete, data, (err, result) => {
                if (err)
                    reject(err)
                else
                    resolve(result);
            })
        })
    }

    static delete(id_utilisateur, id_produit) {
        return new Promise((resolve, reject) =>  {
            const requete = "DELETE FROM produit_favori WHERE id_utilisateur = ? AND id_produit = ?";

            db.query(requete, [id_utilisateur, id_produit], (err, result) => {
                if (err)
                    reject(err)
                else
                    resolve(result);
            })
        })
    }

    static getProduitsFavorisDispoOfUser(id_utilisateur) {
        return new Promise((resolve, reject) => {
            const requete = "SELECT p2.* " +
                "FROM produit_favori p1 " +
                "JOIN produit p2 ON p2.id_produit=p1.id_produit AND p1.id_utilisateur = ?";

            db.query(requete, [id_utilisateur], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        })
    }
}

module.exports = ProduitFavori;
