const {Users, Ventas, Comidas} = require ("../db.js");
const sequelize = require('sequelize');
/* const mercadopago = require("mercadopago");
const { MERCADOPAGO_KEY, FRONT_URL } = process.env; */

    const getOrders = async (req, res) => {
    try{
      if(!req.query?.email) throw 'No body params'
  
      let requestUser = await  Users.findOne({where: {email: req.query.email}});
  
      if (!requestUser) return res.status(403).send('Wrong user');
  
      let returnedOrders;
  
      if ((requestUser.dataValues.role !== null) && (req.query?.all === 'true')) returnedOrders = await Ventas.findAll({
        include: [
          {model: Comidas, attributes: ['id']},
          {model: Users, attributes: ['email']}
        ]
      });
    
      else returnedOrders = await Ventas.findAll({
        where: { UserEmail: req.query.email },
        include: [
          { model: Comidas, attributes: ['id'] },
          { model: Users, attributes: ['email'] }
        ],
        raw: true,
        nest: true,
        attributes: [
          'id',
          'UserEmail',
          'Comidaid',
          'PreferenceId',
          'PrecioTotal',
          'Comidas.id',
          'Users.email'
        ]
      });
  
      /* res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Pragma", "no-cache");
      res.header("Expires", 0); */
  
      return (!returnedOrders)
        ? res.status(404).send('Orders Not Found')
        : res.send(returnedOrders);
    }
    catch(error) {
      console.log(error);
      res.status(500).send(error);
    }
  };

//   mercadopago.configure({ access_token: MERCADOPAGO_KEY });

const postOrder = async (req, res) => {
  try {
    if (!req.body?.cart || !req.body?.email || !req.body?.address)
      throw "No body params";

    const userInstance = await Users.findOne({
      where: { email: req.body.email },
    });

    if (!userInstance) throw "Unregistred user";

    let preference = {
      items: req.body.cart.map(({ Efectivo }) => ({
        quantity: 1,
        unit_price: amount * price,
      })),
      back_urls: {
        success: "/",
        failure: "/",
      },
      auto_return: "approved",
      binary_mode: true,
    };

    mercadopago.preferences
      .create(preference)
      .then(async (respPref) => {
        mercadopago.merchant_orders
          .create({ preference_id: respPref.response.id })
          .then(async (respMerc) => {
            const orderInstance = await Ordenes.create({
              userId: userInstance.dataValues.id,
              preferenceId: respMerc.response.preference_id,
              merchant_orderId: respMerc.response.id,
              address: req.body.address
            });
            // init_point: https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=48965690-ddb3e9dd-7963-474a-adc8-246bde9b0935

            await Ordenes_detalles.bulkCreate(
              req.body.cart.map(({ id, comidaId, cantidad, precio }) => ({
                orderId: orderInstance.dataValues.id,
                ingredientId: id,
                comidaId,
                cantidad,
                precio,
              }))
            );

            res.send(orderInstance);
            return orderInstance;
          })
          .then((orderInstance) => {
            sendEmailWithTemplate(req.body.email, "orderConfirmed", {
              orderNumber: orderInstance.id,
              items: req.body.cart,
              preferenceId: orderInstance.preferenceId
            });
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
    getOrders, postOrder
}
