const db = require('../config/db');

class Avis {

    static create(data) {
        return new Promise((resolve, reject) => {
            const requete = "INSERT INTO avis SET ?";

            db.query(requete, data, (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            })
        })
    }

    static delete(id_utilisateur, id_produit) {
        return new Promise((resolve, reject) => {
            const requete = "DELETE FROM avis WHERE id_utilisateur = ? AND id_produit = ?";

            db.query(requete, [id_utilisateur, id_produit], (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            })
        })
    }

    static exist(id_utilisateur, id_produit) {
        return new Promise((resolve, reject) => {
            const requete = "SELECT count(*) as nb FROM avis WHERE id_utilisateur = ? AND id_produit = ?";

            db.query(requete, [id_utilisateur, id_produit], (err, result) => {
                if (err)
                    reject(err);
                else {
                    const exist = (result[0].nb === 1);
                    resolve(exist);
                }
            })
        })
    }

    static getAvisOfProduit(id_produit) {
        return new Promise((resolve, reject) => {
            const requete = "SELECT u.nom_utilisateur, u.prenom_utilisateur, a.date_avis, a.commentaire_avis, a.note " +
                "FROM avis a " +
                "JOIN utilisateur u ON u.id_utilisateur=a.id_utilisateur " +
                "WHERE a.id_produit = ? " +
                "ORDER BY a.date_avis";

            db.query(requete, [id_produit], (err, rows) => {
                if (err)
                    reject(err)
                else
                    resolve(rows)
            })
        })
    }
}

module.exports = Avis;


