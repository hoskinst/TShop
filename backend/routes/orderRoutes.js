import express from "express";
import {
    addOrderItems,
    getMyOrders,
    getOrders,
    getOrdersById,
    updateOrderToDelivered,
    updateOrderToPaid
} from '../controllers/orderController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders);

router.route('/mine').get(protect, getMyOrders);

router.route('/:id').get(protect, admin, getOrdersById);

router.route('/:id/pay').put(protect, updateOrderToPaid)

router.route('/:id/delivered').put(protect, updateOrderToDelivered)

export default router;
