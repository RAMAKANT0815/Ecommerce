import express from 'express';
import { getAllProducts, getSingleProduct, updateProduct, createProduct, deleteProduct, getAdminProducts, createReviewProduct, getProductReviews, deleteReviewProduct} from '../controller/productController.js';
import { verifyUserAuth,roleBasedAccess } from '../middleware/userAuth.js';
const router = express.Router();

router.route("/products").get(getAllProducts)

router.route("/admin/products").get(verifyUserAuth, roleBasedAccess("admin"), getAdminProducts);

router.route("/admin/product/create").post(verifyUserAuth, roleBasedAccess("admin"), createProduct);

router.route("/admin/product/:id").put(verifyUserAuth, roleBasedAccess("admin"), updateProduct).delete(verifyUserAuth, roleBasedAccess("admin"), deleteProduct);

router.route("/product/:id").get(getSingleProduct);
router.route("/review").put(verifyUserAuth, createReviewProduct);
router.route("/reviews").get(getProductReviews).delete(verifyUserAuth, deleteReviewProduct);

export default router;