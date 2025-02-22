const Stripe = require("stripe");

const catchAsync = require("../utils/catchAsync");

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get current booked tour
  // const tour = await Tour.findById(req.params.tourId);

  // 2) Create checkout session
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/?amount=${req.query.amount}&user=${req.user.id}`,
    cancel_url: `${req.protocol}://${req.get("host")}`,
    customer_email: req.user.email,
    client_reference_id: req.user.id,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: req.query.price * 100,
          product_data: {
            name: `${req.query.price} Donation`,
            description: "Thank you for donating",
            images: [`https://unsplash.it/400/400`],
          },
        },
      },
    ],
  });

  // 3) Create session as response
  res.status(200).json({
    status: "success",
    session,
  });
});
