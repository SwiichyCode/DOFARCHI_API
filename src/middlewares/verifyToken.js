const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["x-acces-token"];

  if (!token) {
    return res.status(403).json({ message: "Aucun token fourni" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ message: "Token invalide" });
    }

    mongoose.connection
      .collection("tokens")
      .findOne({ token }, (error, data) => {
        if (error) {
          return res.status(500).json({ message: error });
        }

        if (!data) {
          return res.status(403).json({ message: "Token invalide" });
        }

        req.token = decodedToken;

        next();
      });
  });
};
