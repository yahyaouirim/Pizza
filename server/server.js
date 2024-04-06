const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const port = process.env.PORT;

require("./config/mongoose.config");

// Middleware for parsing JSON and URL-encoded data
app.use(express.json(), express.urlencoded({ extended: true }));

// app.use(cors());
app.use(cors({credentials: true, origin:"http://localhost:3000"}))

// Use the cookieParser middleware to parse the cookie header
app.use(cookieParser());

const UserRoutes = require("./routes/user.routes");
UserRoutes(app);
const PizzaRoutes = require("./routes/pizza.routes");
PizzaRoutes(app);
app.listen(port, () => console.log(`The server is all fired up on port: ${port}`));