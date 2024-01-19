const express = require('express')
const adminController = require('../controller/adminController')
const vrfyToken = require('../middleware/adminAuth')
const uploadCloudinary = require('../middleware/multer')
const adminRouter = express.Router()


adminRouter.post('/login',(adminController.adminLogin))


.use(vrfyToken) 

.get('/users',(adminController.getAllUsers))
.get('/users/:id',(adminController.getUsersById))
.get('/products',adminController.getAllProducts)
.get('/products',(adminController.getProductByCategory))
.put('/products/:id',(adminController.updateProduct))
.post('/create',uploadCloudinary,(adminController.createProduct))
.delete('/products',(adminController.deleteProduct))
.post('/createcategory',(adminController.createCategory))
.get('/categories',(adminController.getAllCategory))
.put('/updatecategory/:id',(adminController.updateCatgory))
.delete('/deletecategory/:id',(adminController.deleteCategory))
.get('/purchasedproducts',(adminController.allPurchasedProducts))



module.exports = adminRouter