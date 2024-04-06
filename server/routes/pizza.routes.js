const PizzaController = require("../controllers/pizza.controller");
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.get("/api/pizzas/:userId", authenticate, PizzaController.getAllPizzas);
    app.post("/api/createPizza", authenticate,PizzaController.createPizza);
    app.get("/api/getOnePizza/:id", authenticate,PizzaController.getOnePizza);
    app.patch("/api/updatePizza/:id", authenticate,PizzaController.updatePizza);
    app.delete("/api/deletePizza/:id", authenticate,PizzaController.deletePizza);
}