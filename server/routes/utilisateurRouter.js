const express = require('express');
const router = express.Router();
const utilisateurMdlw = require('../middlewares/utilisateurMdlw');
const utilisateurCtrl = require('../controllers/utilisateurController')

router.route('/login')
    .post(utilisateurCtrl.login)

router.route('/register')
    .post(utilisateurCtrl.register)

router.route('/logout')
    .post(utilisateurMdlw.isConnected, utilisateurCtrl.logout)


module.exports = router;
