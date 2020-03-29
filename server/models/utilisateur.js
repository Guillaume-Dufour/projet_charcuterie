const db = require('../config/db');

class Utilisateur {

    static create(data) {
        return new Promise((resolve, reject) => {
            const requete = "INSERT INTO utilisateur SET ?";

            db.query(requete, data, (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            })
        })
    }

    static getAllUsers() {
        return new Promise((resolve,reject) => {
            const requete = "SELECT * FROM utilisateur WHERE type_utilisateur!=1 AND est_actif=1";

            db.query(requete, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows)
            });
        })
    }

    static getAllClients() {
        return new Promise((resolve,reject) => {
            const requete = "SELECT * FROM utilisateur WHERE type_utilisateur=3 AND est_actif=1";

            db.query(requete, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows)
            });
        })
    }

    static getUserById(id_utilisateur) {
        return new Promise((resolve, reject) => {
            const requete = "SELECT * FROM utilisateur WHERE id_utilisateur = ?";
            db.query(requete, [id_utilisateur], (err, rows) => {

                if (err)
                    reject(err);
                else if (rows[0])
                    resolve(rows[0]);
                else
                    resolve(-1);
            })
        })
    }

    static getUserByMail(mail_utilisateur) {
        return new Promise((resolve, reject) => {
            const requete = "SELECT * FROM utilisateur WHERE mail_utilisateur = ?";

            db.query(requete, [mail_utilisateur], (err, rows) => {
                if (err)
                    reject(err);
                else if (rows[0])
                    resolve(rows[0]);
                else
                    resolve(-1);
            })
        })
    }

    static udpateUser(id_utilisateur, data) {
        return new Promise((resolve, reject) => {

            let requete = "UPDATE utilisateur SET";
            let values = [];

            const keys = data.keys();

            for (const key of keys) {
                requete += " "+key+" = ?,";
                values.push(data.get(key));
            }

            values.push(id_utilisateur);
            requete = requete.substring(0, requete.length-1);
            requete += " WHERE id_utilisateur = ? ";

            db.query(requete, values, (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            })
        })
    }

    static deleteUser(id_utilisateur) {
        return new Promise((resolve, reject) => {
            const requete = "UPDATE utilisateur " +
                "SET nom_utilisateur='Anonyme', " +
                "prenom_utilisateur='', " +
                "mail_utilisateur='', " +
                "sexe_utilisateur=0, " +
                "password_utilisateur='', " +
                "telephone_utilisateur='', " +
                "est_actif=0 " +
                "WHERE id_utilisateur = ?";

            db.query(requete, [id_utilisateur], (err, result) => {
                if (err)
                    reject(err);
                else
                    resolve(result);
            })
        })
    }
}

module.exports = Utilisateur;
