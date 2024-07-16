const jwt = require("jsonwebtoken")
require("dotenv").config()
const bcrypt = require("bcryptjs")
const utilities = require("../utilities/")
const accountModel = require("../models/account-model")



/* ****************************************
 *  Deliver login view
 * *************************************** */
async function buildLogin(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
    errors: null,
  })
}


/* ****************************************
 *  Deliver registration view
 * *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}

/* ****************************************
 *  Deliver management view
 * *************************************** */
async function management(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/management", {
    title: "Management",
    nav,
    errors: null,
  })
}

/* ****************************************
 *  Deliver Update view
 * *************************************** */
async function buildUpdate(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/account-update", {
    title: "Update",
    nav,
    errors: null,
  })
}


/* ****************************************
 *  Process Registration
 * *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password,
  } = req.body
  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_password,
    hashedPassword
  )
  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
    })
  }
}

/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav()
  const {
    account_email,
    account_password
  } = req.body
  const accountData = await accountModel.getAccountByEmail(account_email)
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.")
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    })
    return
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 3600
      })
      if (process.env.NODE_ENV === 'development') {
        res.cookie("jwt", accessToken, {
          httpOnly: true,
          maxAge: 3600 * 1000
        })
      } else {
        res.cookie("jwt", accessToken, {
          httpOnly: true,
          secure: true,
          maxAge: 3600 * 1000
        })
      }
      return res.redirect("/account/")
    }
  } catch (error) {
    return new Error('Access Forbidden')
  }
}


/* ****************************************
 *  Process Update
 * *************************************** */
async function updateAccount(req, res) {
  let nav = await utilities.getNav()
  const {
    account_firstname,
    account_lastname,
    account_email,
  } = req.body
  // Hash the password before storing
  // let hashedPassword
  // try {
  //   // regular password and cost (salt is generated automatically)
  //   hashedPassword = await bcrypt.hashSync(account_password, 10)
  // } catch (error) {
  //   req.flash("notice", 'Sorry but the update failed.')
  //   res.status(500).render("account/account-update", {
  //     title: "Updating",
  //     nav,
  //     errors: null,
  //   })
  // }

  const regResult = await accountModel.updateAccount(
    account_firstname,
    account_lastname,
    account_email,
  )
  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'ve updated your information!`
    )
    res.status(201).render("account/management", {
      title: "Update",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the update failed.")
    res.status(501).render("account/account-update", {
      title: "Updating",
      nav,
    })
  }
}


/* ****************************************
 *  Process Password Update
 * *************************************** */
async function updatePassword(req, res) {
  let nav = await utilities.getNav()
  const {
    account_password,
  } = req.body
  // Hash the password before storing
  // let hashedPassword
  // try {
  //   // regular password and cost (salt is generated automatically)
  //   hashedPassword = await bcrypt.hashSync(account_password, 10)
  // } catch (error) {
  //   req.flash("notice", 'Sorry but the update failed.')
  //   res.status(500).render("account/account-update", {
  //     title: "Updating",
  //     nav,
  //     errors: null,
  //   })
  // }

  const regResult = await accountModel.updatePassword(
    account_password,
  )
  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'ve updated your password!`
    )
    res.status(201).render("account/management", {
      title: "Password Update",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the update failed.")
    res.status(501).render("account/account-update", {
      title: "Updating Password",
      nav,
    })
  }
}


/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
async function getInventoryJSON (req, res, next){
const account_type = parseInt(req.params.account_type)
const invData = await accountModel.getAccountById(account_type)
if (invData[0].inv_id) {
return res.json(invData)
   } else {
     next(new Error("No data returned"))
   }
 }


 /* ****************************************
 *  Greet Client
 * *************************************** */
async function greetClient(req, res) {
  let nav = await utilities.getNav()
  const {
    account_firstname,
    account_lastname,
    account_type
  } = req.body

  if (account_type = 'Client') {
    req.flash(
      "notice",
      `Welcome ${account_firstname}.`
    )
    res.status(201).render("account/account-update", {
      title: "Update",
      nav,
    })
  } else {
    req.flash("notice", `Welcome ${account_firstname}. Inventory Management`)
    res.status(501).render("inventory/management", {
      title: "Update",
      nav,
    })
  }
}
module.exports = {
  buildLogin,
  buildRegister,
  registerAccount,
  management,
  accountLogin,
  buildUpdate,
  updateAccount,
  updatePassword,
  getInventoryJSON,
  greetClient
}