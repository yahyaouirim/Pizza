const mongoose = require('mongoose');

const PizzaOrderSchema = new mongoose.Schema({
    method:
    {
        type: String,
        enum: ["CarryOut", "Delivery"],
        validate: {
            validator: function (value) {
              return value !== "Choose"; 
            },
            message: "Method is required.",
          },
        required: [true, "Method is required."],
        },
    
    size:
    {
        type: String,
        required: [true, "{PATH} is required"],
        validate: {
            validator: function (value) {
              return value !== "Choose"; 
            },
            message: "Size is required.",
          },
          required: [true, "Size is required."],
        },
    crust:
    {
        type: String,
        enum: ["ThinCrust", "Regular", "ThickCrust"],  validate: {
            validator: function (value) {
              return value !== "Choose"; 
            },
            message: "Crust is required.",
          },
          required: [true, "Crust is required."],
        
    },
    quantity:
    {
        type: Number,
        min: [1, "Quantity must be at least 1"],
        default: 1,
    },
    toppings:
    {
        type: Array,
        validate: [
            {
              validator: function (value) {
                return value.length > 0;
              },
              message: "you must choose one topping at least.",
            },
          ],
          default: [],
    },
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isPurchased:
    {
        type: Boolean,
        default: false
    },
    crustPrice:
    {
        type: Number,
        default: function () {
            let price = 0;
            if (this.crust === "ThinCrust") price += 2;
            else if (this.crust === "Regular") price += 3;
            else if (this.crust === "ThickCrust") price += 4;
            return price;
        }
    },
    methodPrice: {
        type: Number,
        default: function () {
            let price = 0;
            if (this.method === "CarryOut") price += 5;
            else if (this.method === "Delivery") price += 7;
            return price;
        }
    },
    sizePrice:{
        type: Number,
        default: function () {
            let price = 0;
            if (this.size === "Small") price += 2;
            else if (this.size === "Medium") price += 3;
            else if (this.size === "Large") price += 4;
            return price;
        }
    },
    toppingsPrice: {
        type: Number,
        default: function () {
            let price = 0;
            this.toppings.forEach((topping) => {
                if (topping === "Pepperoni") price += 4;
                else if (topping === "Pineapple") price += 3;
                else if (topping === "Chiken") price += 3;
                else if (topping === "Extracheese") price += 5;
                else if (topping === "Onions") price += 1;
                else if (topping === "Olives") price += 1;
                else if (topping === "Sausage") price += 2;
                else if (topping === "Mushrooms") price += 3;

            });
            return price;

        }
    },

    totalPrice:
    {
        type: Number,
        default: function () {
            let price = 0;
            price += this.methodPrice;
            price += this.sizePrice;
            price += this.crustPrice;
            price += this.toppingsPrice;
            price *= this.quantity;
            return price;

        }
    },
    
    isFavorite:
        { type: Boolean, default: false },

}, { timestamps: true });

module.exports = mongoose.model('PizzaOrder', PizzaOrderSchema);