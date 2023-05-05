const Stripe = require("stripe");

//instancio a stripe // la clave va con variable de entorno
const stripe = new Stripe(
  "sk_test_51N42BCBSrEQZgu90tmmqu1XosIWVVDIqXPNgr9VRjhfgEXc8oIEukd9Nzu7D7GgCXmHtp9db49YJBwDS12yF9xrB00diqyimcv"
);

const checkOut = async (req, res) => {
  try {
    const { id, amount, Producto } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: JSON.stringify(Producto),
      payment_method: id,
      confirm: true,
    });
    console.log(payment);

    if (payment.status === "succeeded") {
      res.status(200).json({ message: "Pago realizado correctamente" });
    } else {
      res.status(400).json({ message: "El pago no se pudo procesar" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.raw.message });
  }
};

module.exports = {
  checkOut,
};
