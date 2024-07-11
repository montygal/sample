// Needed Resources 
const express = require("express")
const router = new express.Router() 
const accountController = require("../controllers/accountController")
const Util = require("../utilities")
const regValidate = require('../utilities/account-validation')


// Route to build inventory by classification view
router.get("/login", Util.handleErrors(accountController.buildLogin))
router.get("/register", Util.handleErrors(accountController.buildRegister))
router.post('/register', Util.handleErrors(accountController.registerAccount))
router.get("/", Util.checkLogin, Util.handleErrors(accountController.management))

//Route to build account updates
router.get("/account-update", Util.handleErrors(accountController.buildUpdate))
router.post("/account-update", Util.handleErrors(accountController.updateAccount))
// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    Util.handleErrors(accountController.registerAccount)
  )

// Process the login request
router.post(
  "/login",
  // regValidate.loginRules(),
  // regValidate.checkLoginData,
  Util.handleErrors(accountController.accountLogin)
)  


  
module.exports = router