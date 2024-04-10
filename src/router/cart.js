import { Router } from "express";
import {
    addItemToCart,
    decreaseProductQuantity,
    getCartByUserId,
    increaseProductQuantity,
    removeFromCart,
    updateProductQuantity,
} from "../controllner/cart";

const router = Router();

router.get("/cart/:userId", getCartByUserId);
router.post("/cart/add-to-cart", addItemToCart);
router.post("/cart/update", updateProductQuantity);
router.post("/cart/remove", removeFromCart);
router.post("/cart/increase", increaseProductQuantity);
router.post("/cart/decrease", decreaseProductQuantity);

export default router;