import asyncHandler from "../middleware/async-handler.js"
import Order from "../models/orderModel.js"

// @desc create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async(req, res) => {
    const {
        itemsPrice,
        orderItems,
        paymentMethod,
        shippingAddress,
        shippinhPrice,
        taxPrice,
        totalPrice
    } = req.body
    if (orderItems && 0 === orderItems.length) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            itemsPrice,
            paymentMethod,
            shippingAddress,
            shippinhPrice,
            taxPrice,
            totalPrice,
            orderItems: orderItems.map((orderItem) => ({ ...orderItem, product: orderItem._id, _id: undefined })),
            user: req.user._id,
            
        })
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
})

// @desc get logged in users orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
})

// @desc get orders by id
// @route GET /api/orders/:id
// @access Private
const getOrdersById = asyncHandler(async(req, res) => {
    const order = await Order
        .findById(req.params.id)
        .populate('user', 'name email')
    if (order) {
        res.status(200).json(order)
    } else {
        res.status(404)
        throw new Error('No order found')
    }
})

// @desc update order to paid
// @route GET /api/orders/:id/pay
// @access Private/Admin
const updateOrderToPaid = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymnetResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address 
        }
        const updateOrder = await order.save();
    } else {
        res.status(404)
        throw new Error('No order found.');
    }
})

// @desc update order to paid
// @route GET /api/orders/:id/delivered
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async(req, res) => {
    const order = Order.findById(req.params.id)
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Data.now();
        const updatedOrder = order.save();
        res.status(200).json(updatedOrder);
    } else {
        res.status(404)
        throw new Error('No order found.')
    }
})

// @desc get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders);;

});

export {
    addOrderItems,
    getMyOrders,
    getOrders,
    getOrdersById,
    updateOrderToDelivered,
    updateOrderToPaid
}


