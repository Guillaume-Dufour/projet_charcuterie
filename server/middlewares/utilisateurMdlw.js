module.exports = {
    isConnected: (req, res, next) => {
        if (localStorage.getItem('accessToken') !== null) {
            next();
        }
        else {
            return res.status(300).json({
                error: "Pas connecté"
            })
        }
    }
}
