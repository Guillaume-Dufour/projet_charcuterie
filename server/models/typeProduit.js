const db = require('../config/db');

class TypeProduit {

    static create(data) {
        return new Promise((resolve, reject) => {
            const requete = "INSERT INTO type_produit SET ?";

            db.query(requete, data, (err, result) => {
                if (err)
                    reject(err)
                else
                    resolve(result);
            })
        })

    }

    static update(id_type_produit, data) {
        return new Promise((resolve, reject) => {
            const requete = "UDPATE type_produit SET libelle_type_produit = ?, libelle_sous_type_produit = ? WHERE id_type_produit = ?";

            db.query(requete, [
                data.libelle_type_produit,
                data.libelle_sous_type_produit,
                id_type_produit
            ],
                (err, result) => {
                    if (err)
                        reject(err)
                    else
                        resolve(result);
                })
        })
    }

    static getAllTypes() {
        return new Promise((resolve, reject) => {
            const requete = "SELECT * FROM type_produit ORDER BY libelle_type_produit, libelle_sous_type_produit";

            db.query(requete, [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        })
    }
}

module.exports = TypeProduit;
