const Stripe = require("stripe");

const STRIPE = process.env.REACT_APP_STRIPE;
//instancio a stripe // la clave va con variable de entorno
const stripe = new Stripe(
  STRIPE
);

const checkOut = async (req, res) => {
  try {
    const { id, amount, Producto, metadata } = req.body;
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: JSON.stringify(Producto),
      payment_method: id,
      confirm: true,
      metadata: {user_email: metadata.user.email // agrega el email del usuario a la metadata
  }
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
