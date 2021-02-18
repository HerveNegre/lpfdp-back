const express = require("express");
const router = express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");

// controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  createOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
} = require("../controllers/user");

//routes
router.post("/user/cart", authCheck, userCart); //enregitrer panier
router.get("/user/cart", authCheck, getUserCart); //panier
router.delete("/user/cart", authCheck, emptyCart); //panier vide
router.post("/user/address", authCheck, saveAddress);

//commande
router.post("/user/order", authCheck, createOrder); //stripe
router.get("/user/orders", authCheck, orders);

// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

module.exports = router;