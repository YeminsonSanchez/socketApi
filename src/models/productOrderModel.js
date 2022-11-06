const pool = require('../helpers/connectDb').getInstance()
const createProductOrder = async (purchaseId, payload) => {
  console.log('payload: ', payload);
  const SQLquery = {
    text: 'INSERT INTO product_order (oc, purchase_order_id, quantity, product_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    values: [
      payload.oc,
      purchaseId,
      payload.quantity,
      payload.product_id,
      payload.status,
    ],
  }
  try {
    const result = await pool.query(SQLquery)
    return result.rows
  } catch (e) {
    console.log(
      'error al insertar datos en tabla order: ',
      e.code,
      e.message,
    )
    throw new Error(e)
  }
}

module.exports = { createProductOrder }