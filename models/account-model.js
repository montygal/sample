const pool = require("../database/")



/* *****************************
 *   Register new account
 * *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
  try {
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
    return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
  } catch (error) {
    return error.message
  }
}

/* *****************************
 * Return account data using email address
 * ***************************** */
async function getAccountByEmail(account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}


/* *****************************
 *   Update Account
 * *************************** */
async function updateAccount(account_firstname, account_lastname, account_email) {
  try {
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email) VALUES ($1, $2, $3, 'Client') RETURNING *"
    return await pool.query(sql, [account_firstname, account_lastname, account_email])
  } catch (error) {
    return error.message
  }
}


/* *****************************
 *   Update Password
 * *************************** */
async function updatePassword(account_password) {
  try {
    const sql = "INSERT INTO account ( account_password) VALUES ($1, Client') RETURNING *"
    return await pool.query(sql, [account_password])
  } catch (error) {
    return error.message
  }
}


/* *****************************
 * Return account data using account id
 * ***************************** */
async function getAccountById(account_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM account_id`,
      [account_id]
    )
    return data.rows
  } catch (error) {
    console.error("getAccountById error " + error)
  }
}


module.exports = {
  registerAccount,
  getAccountByEmail,
  updateAccount,
  updatePassword,
  getAccountById
};