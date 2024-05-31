/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const expressLayouts = require("express-ejs-layouts")
const baseController = require("./controllers/baseController")

/* ***********************
 VIEW ENGINE AND TEMPLATES
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") //not at views root


/* ***********************
 * Routes
 *************************/
app.use(static)
//Index Route
app.get("/", baseController.buildHome)
/*The new code uses the imported 
"baseController" to "call" the "buildHome" method.
This will execute the function in the controller, 
build the navigation bar and pass it and the title 
name-value pair to the index.ejs view, which will 
then be sent to the client.*/
app.use("/inv", inventoryRoute)



/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})
