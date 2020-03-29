const Utilisateur = require('../models/utilisateur');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports = {
    register: (req, res) => {
        const data = {
            nom_utilisateur: req.body.nom_utilisateur,
            prenom_utilisateur: req.body.prenom_utilisateur,
            mail_utilisateur: req.body.mail_utilisateur,
            sexe_utilisateur: req.body.sexe_utilisateur,
            type_utilisateur: 1,
            password_utilisateur: req.body.password_utilisateur,
            telephone_utilisateur: req.body.telephone_utilisateur,
            est_actif: 1
        };

        /** VERIFICATIONS COTE SERVEUR A FAIRE */

        Utilisateur.create(data)
            .then(result => {

                const accessToken = jwt.sign({
                        id_utilisateur: result.insertId,
                        type_utilisateur: data.type_utilisateur
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: '2h'
                    });

                return res.status(200).json({
                    success : true,
                    token : accessToken,
                });
            })
            .catch(() => {
                return res.status(300).json({
                    success: false,
                    message: "Une erreur est survenue. Veuillez réessayer."
                })
            })
    },
    login: (req, res) => {
        const data = {
            mail: req.body.mail_utilisateur,
            password: req.body.password_utilisateur
        };
        Utilisateur.getUserByMail(data.mail)
            .then((user) => {
                console.log(user)
                if (user === -1 || user.est_actif === 0) {
                    return res.json({
                        codeRetour: -1
                    })
                }
                else {
                    const check_password = bcrypt.compareSync(data.password, user.password_utilisateur);

                    if (check_password) {
                        const accessToken = jwt.sign({
                            id_utilisateur: user.id_utilisateur,
                            type_utilisateur: user.type_utilisateur
                        },
                            process.env.TOKEN_KEY,
                            {
                                expiresIn: '2h'
                            });

                        return res.json({
                            accessToken
                        })
                    }
                    else {
                        return res.json({
                            codeRetour: 0
                        })
                    }
                }

        })
    },
    logout: (req, res) => {
        return res.status(200).json({
            success: true
        })
    }

}

