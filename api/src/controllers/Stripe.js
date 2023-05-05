const Stripe = require ("stripe")


//instancio a stripe // la clave va con variable de entorno
const stripe = new Stripe("sk_test_51N42BCBSrEQZgu90tmmqu1XosIWVVDIqXPNgr9VRjhfgEXc8oIEukd9Nzu7D7GgCXmHtp9db49YJBwDS12yF9xrB00diqyimcv")


const checkOut = async (req, res) => {
    try {
        const {id, amount} = req.body;
        const payment = await stripe.paymentIntents.create({
            amount, 
            currency: "USD",
            description: "id del producto",
            payment_method: id,
            confirm:true
        });
        console.log (payment);

        res.send({message: "Pago realizado"})
    } catch (error) {
        console.log(error);
        res.json({message:error.raw.message})
    }

};




module.exports = {
    checkOut
}