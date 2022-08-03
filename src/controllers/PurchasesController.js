const knex = require("../database/knex");


class PurchasesController {

  async create(req, res) {

    const user_id = req.user.id
    
     const { product_id } = req.query;

    const user = await knex("users").select("name", "email")
      .where({ id: user_id })
      .first();

    const product = await knex("products")
      .select("title", "price")
      .where({ id: product_id })
      .orderBy("title")

     await knex("purchases").insert({
      user_id,
      product_id,
     })

    return res.json({
      user,
      ...product

    });
  }

  async show(req, res) {

    //const user_id = req.params


    const purchases = await knex.raw(`	SELECT 
    purchases.created_at ,
    users.name ,
    users.email, 
    products.title, 
    products.price 
    FROM purchases 
    INNER JOIN  users 
    ON purchases.user_id = users.id
	  INNER JOIN  products 
    ON purchases.product_id = products.id`)

    return res.json({ purchases });
  }

}

module.exports = PurchasesController;