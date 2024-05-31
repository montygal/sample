const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

module.exports = {getClassifications}
/*Line 6 - creates an "asynchronous" function, named getClassifications. 
An asynchronous function returns a promise, without blocking (stopping) the 
execution of the code. It allows the application to continue and will then deal
 with the results from the promise when delivered.
Line 7 - will return (send back) the result of the SQL query, 
which will be sent to the database server using a pool connection, when the 
resultset (data) or an error, is sent back by the database server. 
Notice the two keywords: return and await. Await is part of the Async - Await 
promise structure introduced in ES6. Return is an Express keyword, indicating 
that the data should be sent to the code location that called the function 
originally.*/

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

module.exports = {getClassifications, getInventoryByClassificationId};

