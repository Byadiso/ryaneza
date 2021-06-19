import express from "express";
const router = express.Router();

import { requireSignin, isAuth, isAdmin } from "../controllers/auth";
import { userById, addOrderToUserHistory } from "../controllers/user";
import {
    create,
    listOrders,
    getStatusValues,
    orderById,
    updateOrderStatus
} from "../controllers/order";
import { decreaseQuantity } from "../controllers/property";

router.post(
    "/order/create/:userId",
    requireSignin,
    isAuth,
    addOrderToUserHistory,
    decreaseQuantity,
    create
);

router.get("/order/list/:userId", requireSignin, isAuth, listOrders);
router.get(
    "/order/status-values/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    getStatusValues
);
router.put(
    "/order/:orderId/status/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    updateOrderStatus
);

router.param("userId", userById);
router.param("orderId", orderById);

module.exports = router;
