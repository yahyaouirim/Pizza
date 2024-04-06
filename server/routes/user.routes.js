// Import the UserController
const UserController = require("../controllers/user.controller");
const { authenticate } = require('../config/jwt.config');

// Define API routes for User operations and associate them with corresponding controller methods
module.exports = (app) => {
    app.post("/api/register", UserController.register);
    app.post("/api/login", UserController.login);
    app.post("/api/logout", UserController.logout);
    app.get('/api/loggedUser/:id', authenticate,UserController.getLoggedUser)
    app.patch("/api/updateUser/:id", authenticate,UserController.updateUser);
};