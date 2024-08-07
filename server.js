/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const cookieParser = require("cookie-parser")
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const env = require("dotenv").config()
const app = express()
const static = require("./routes/static")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute.js")
const utilities = require("./utilities/")
const session = require("express-session")
const pool = require('./database/')
const accountRoute = require("./routes/accountRoute.js")
const accountController = require("./controllers/accountController")
const bodyParser = require("body-parser")


/* ***********************
 * Middleware
 * ************************/
app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool,
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: 'sessionId',
}))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// Express Messages Middleware
app.use(require('connect-flash')())
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req, res)
  next()
})

// app.use(utilities.checkJWTToken)

app.use(cookieParser())
/* ***********************

 * View Engine and Templates
 *************************/

app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root

/* ***********************
 * Routes
 *************************/

//This code uses the imported baseController to "call" the buildHome method
//This will execute the function in the controller, build the navigation and pass it to index.ejs view
app.get("/", utilities.handleErrors(baseController.buildHome))

app.use(static)
//Index route
//This code uses the imported baseController to "call" the buildHome method
//This will execute the function in the controller, build the navigation and pass it to index.ejs view
app.get("/", baseController.buildHome)



/*Inventory route*/
app.use("/inv", inventoryRoute)

// *Account Route*/
app.use("/account", accountRoute)


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