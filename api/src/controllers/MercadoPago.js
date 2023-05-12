const mercadopago = require ('mercadopago');
const MercadoPagoAccesToken = process.env.REACT_APP_MERCADOPAGO_ACCESS_TOKEN;

mercadopago.configure ({access_token : MercadoPagoAccesToken})

const Payment =  (req, res) => {
   
    const prod = req.body;
let preference = {
items: [{
    
    title: prod.title,        //TENGO QUE CONFIGURAR TODO IGUAL QUE TENGO EL PRODUCTO
    currency_id: "ARS",
    description: JSON.stringify(prod.description),
    quantity: 1,
    unit_price: prod.price
}],
back_urls: 
{success:"htto://localhost:3000", 
failure:"htto://localhost:3000", 
},
auto_return: 'approved',
binary_mode: true
}
mercadopago.preferences.create(preference).then ((response) => res.status(200).send ({response})).catch((error) => res.status(400).send ({error: error.message})) 
}

module.exports = {
    Payment
}