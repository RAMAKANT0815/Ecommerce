import express from 'express'
import { createOrder, deleteOrder, getAllOrders, getSingleOrder, myAllOrders, updateOrderStatus } from '../controller/orderController.js'
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';

const router = express.Router();

router.route('/new/order').post(verifyUserAuth, createOrder);
router.route('/admin/order/:id')
.get(verifyUserAuth, roleBasedAccess('admin'), getSingleOrder)
.put(verifyUserAuth, roleBasedAccess("admin"), updateOrderStatus)
.delete(verifyUserAuth, roleBasedAccess('admin'), deleteOrder)
router.route("/admin/orders").post(verifyUserAuth, roleBasedAccess("admin"), getAllOrders)
router.route("/order/user").post(verifyUserAuth, myAllOrders);


export default router;
