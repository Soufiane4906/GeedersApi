import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Gig from "../models/gig.model.js";
import Stripe from "stripe";


export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);
  const { totalPrice, city , country , options, hours, buyerId } = req.body; // Retrieve new fields from the request body
  console.log("buyerId,",buyerId);

  // Console total price and other data for debugging


  const gig = await Gig.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice * 100, // Use the total price sent from the frontend
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId,
    sellerId: gig.userId,
    price: gig.price,
    totalprice: totalPrice, // Store total price in the order
    payment_intent: paymentIntent.id,
    options,  // Store options in the order
    duration: hours, // Store duration in the orde
    location: `${city}, ${country}`, // Store location in the order
  });

  try {
    await newOrder.save();
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    next(err);
  }

};



export const getOrders = async (req, res, next) => {
  //console req

  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};
export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
//get order

export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    // Fetch seller info
    const seller = await User.findById(order.sellerId);
    if (!seller) {
      return res.status(404).send({ message: "Seller not found" });
    }
    console.log(seller);


    res.status(200).send({ order, seller });
  } catch (err) {
    next(err);
  }
};
