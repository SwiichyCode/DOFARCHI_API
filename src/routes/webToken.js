const webTokenController = require("../controllers/webToken");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/token/create", webTokenController.generateToken);
  app.post("/api/token/get", webTokenController.getToken);
};
