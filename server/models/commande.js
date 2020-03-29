const db = require('../config/db');

class Commande {

    static create(data, panier) {
        return new Promise((resolve, reject) => {
            const requete1 = "INSERT INTO commande SET ?";
            const requete2 = "INSERT INTO contenu_commande(id_commande, id_produit, quantite_produit) VALUES (?,?,?)";

            db.query(requete1, data, (err, result1) => {
                if (err)
                    reject(err);
                else {
                    panier.forEach(ligne => {
                        db.query(requete2, [result1.insertId, ligne.id_produit, ligne.quantite_produit], (err) => {
                            if (err)
                                reject(err);
                        })
                    });

                    resolve(result1);
                }
            })
        })
    }

    static getAllCommandes() {
        return new Promise((resolve, reject) => {
            const requete = "SELECT c.id_commande, c.date_commande, c.date_retrait_commande, c.prix_commande, u.id_utilisateur, u.nom_utilisateur, u.prenom_utilisateur, s.libelle_statut_commande " +
                "FROM commande c " +
                "JOIN utilisateur u ON u.id_utilisateur=c.id_utilisateur " +
                "JOIN statut_commande s ON s.id_statut_commande=c.id_statut_commande";

            db.query(requete, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        })
    }

    static getCommandeById(id_commande) {
        return new Promise((resolve, reject) => {
            const requete = "SELECT p.libelle_produit, c2.quantite_produit, p.photo_produit, p.prix_produit, p.poids_produit, c1.id_utilisateur " +
                "FROM commande c1 " +
                "JOIN contenu_commande c2 ON c2.id_commande=c1.id_commande " +
                "JOIN produit p ON p.id_produit=c2.id_produit " +
                "JOIN statut_commande s ON s.id_statut_commande=c1.id_statut_commande " +
                "WHERE c1.id_commande = ?";

            db.query(requete, [id_commande], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows[0]);
            })
        })
    }

    static getAllCommandesOfUser(id_utilisateur) {
        return new Promise((resolve, reject) => {
            const requete =   "SELECT * " +
                "FROM commande c " +
                "JOIN statut_commande s ON s.id_statut_commande=c.id_statut_commande" +
                "WHERE c.id_utilisateur = ? " +
                "ORDER BY c.date_retrait_commande DESC";

            db.query(requete, [id_utilisateur], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        })
    }

    static getAllCommandeOfDay(date_retrait_commande) {
        return new Promise((resolve, reject) => {
            const requete = "SELECT u.sexe_utilisateur, u.nom_utilisateur, u.prenom_utilisateur, c.id_commande, c.date_retrait_commande, sc.id_statut_commande, sc.libelle_statut_commande " +
                "FROM commande c " +
                "JOIN statut_commande sc ON sc.id_statut_commande=c.id_statut_commande " +
                "JOIN utilisateur u ON u.id_utilisateur=c.id_utilisateur AND u.est_actif = 1 " +
                "WHERE c.date_retrait_commande >= ? AND c.date_retrait_commande < adddate(?,1)";

            db.query(requete, [date_retrait_commande], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        })
    }

    static getAllStatusCommande() {
        return new Promise((resolve, reject) => {
            const requete = "SELECT * FROM statut_commande";

            db.query(requete, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            })
        })
    }

    static updateStatutCommande(id_commande, id_statut_commande) {
        return new Promise((resolve, reject) => {
            const requete = "UPDATE commande SET id_statut_commande = ? WHERE id_commande = ?";

            db.query(requete, [id_statut_commande, id_commande], (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            })
        })
    }
}

module.exports = Commande;
