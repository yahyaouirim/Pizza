PizzaOrder = require("../models/pizza.model");
const jwt = require('jsonwebtoken')

module.exports = {
    createPizza: async (req, res) => {
        try{
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
            req.body.userId = decodedJwt.payload._id;
            console.log('createpizza:', req.body);
            const pizza = await PizzaOrder.create(req.body);
            res.status(201).json(pizza);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    getAllPizzas: async (req, res) => {
        const id = req.params.userId;
        try{
            const pizzas = await PizzaOrder.find({userId: id}).populate("userId");
            res.status(200).json(pizzas);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    getOnePizza: (req, res) => {
        PizzaOrder.findOne({ _id: req.params.id })
        .then((onePizza) => res.json(onePizza))
        .catch((err) => res.status(500).json(err));
    },
    
    updatePizza: (req, res) => {
        PizzaOrder.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
        )
        .then((pizza) => res.json(pizza))
        .catch((err) => res.status(500).json(err));
    },

    deletePizza: (req, res) => {
        PizzaOrder.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json("Pizza deleted."))
        .catch((err) => res.status(500).json(err));
    }
}