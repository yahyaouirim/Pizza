
// Import the Mongoose library
const mongoose = require("mongoose");

// Get the database name from the environment variables
const dbName = process.env.DB;

// Connect to the MongoDB database
mongoose
.connect(`mongodb://127.0.0.1:27017/${dbName}`)
.then(() => console.log(`Established a connection to the ${dbName} database`))
.catch((err) =>
console.log("Something went wrong when connecting to the database ", err)
);
