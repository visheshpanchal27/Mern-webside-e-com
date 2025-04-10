import express from 'express';
import formidable from 'express-formidable';

const router = express.Router()

import { 
    addProduct,
    removeProduct,
    updateProductDetails,
    fetchProducts,
    fetchProductById,
    fetchAllProducts,
    addProductReview,
    fetchTopProduct,
    fetchNewProduct,
} from '../controllers/productController.js';
import { authentication,authorizeAdmin } from '../middlewares/authMiddleware.js';
import checkId from '../middlewares/checkId.js';

router.route('/')
    .get(fetchProducts)
    .post(authentication,authorizeAdmin,formidable(),addProduct);

router.route('/allProducts').get(fetchAllProducts);
router.route('/:id/reviews').post(authentication, checkId, authorizeAdmin, addProductReview);

router.get('/top', fetchTopProduct)
router.get('/new', fetchNewProduct)

router
    .route('/:id')
    .put(authentication, authorizeAdmin, formidable(), updateProductDetails)
    .get(fetchProductById)
    .delete(authentication, authorizeAdmin, removeProduct);


export default router;