const express = require('express');
const bodyParser = require('body-parser');
const utilisateurRouter = require('./routes/utilisateurRouter');
const produitRouter = require('./routes/produitRouter');

const server = express();

require('dotenv').config();

// Middlewares
server.use(bodyParser.json());

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers", '*');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*')
        return res.status(200).json({})
    }
    next();
})


server.use('/user', utilisateurRouter);
server.use('/produit', produitRouter);


const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log("Serveur listening sur le port "+port+"\nURL : http://localhost:8080/");
});
