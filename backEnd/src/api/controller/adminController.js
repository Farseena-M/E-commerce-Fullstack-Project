const user = require('../model/userSchema')
const asyncErrorHandler = require('../utils/asyncErrorHandler')
const products = require('../model/productSchema')
const jwt = require('jsonwebtoken')
const Category = require('../model/categorySchema')
const ProductOrder = require('../model/productOrderSchema')
const Order = require('../model/orderSchema')

const adminLogin = asyncErrorHandler(async (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ username, isAdmin: true }, process.env.SECRET_STR, {
            expiresIn: process.env.LOGIN_EXPIRES
        })
        res.status(200).json({
            status: 'Success',
            message: 'Login success',
            token
        })
    }
    else {
        res.status(404).json({
            status: 'Not found',
            message: 'Invalied admin'
        })
    }

})




const getAllUsers = asyncErrorHandler(async (req, res) => {
    const allUsers = await user.find()
    if (!allUsers) {
        res.status(404).json({ message: 'Users does not exist' })
    } else {
        res.status(200).json({
            status: 'Success',
            data: {
                user: allUsers
            }
        })
    }
})


const getAllProducts = asyncErrorHandler(async (req, res) => {
    const allProduct = await products.find()
    if (!allProduct) {
        res.status(404).json({ message: 'Products does not exist' })
    } else {
        res.status(200).json({
            status: 'Success',
            data: {
                products: allProduct
            }
        })
    }
})



const getUsersById = asyncErrorHandler(async (req, res) => {
    const usersId = req.params.id;
    const usrsId = await user.findById(usersId)
    if (!usrsId) {
        res.status(404).json({ message: 'User does not exist' })
    } else {
        res.status(200).json({
            status: 'Success',
            data: {
                user: usrsId
            }
        })
    }
})


const getProductByCategory = asyncErrorHandler(async (req, res) => {
    const category = req.query.category;
    const productCategory = await products.find({ category })
    if (productCategory.length === 0) {
        res.status(404).json({ message: 'Products not found' })
    } else {
        res.status(200).json({
            status: 'Success',
            data: {
                productCategory
            }
        })
    }
})





const createProduct = asyncErrorHandler(async (req, res) => {
    console.log(req.body)
    const { title, image, description, price, category, quantity } = req.body;
    const newProduct = await products.create({ title: title, image: image, description: description, price: price, category: category, quantity: quantity })
    res.status(201).json({
        status: 'Success',
        data: {
            products: newProduct
        }
    })
})



const updateProduct = asyncErrorHandler(async (req, res) => {
    const update = await products.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({
        status: 'Success',
        data: {
            products: update
        }
    })
})


const deleteProduct = asyncErrorHandler(async (req, res) => {
    const { productId } = req.body
    console.log(productId);
    await products.findByIdAndDelete({ _id: productId })
    res.status(200).json({
        status: 'Deleted'
    })
})


const createCategory = asyncErrorHandler(async (req, res) => {
    console.log(req.body)
    const { name } = req.body;
    const newCategory = await Category.create({ name })
    res.status(201).json({
        status: 'Success',
        data: {
            Category: newCategory
        }
    })
})



const getAllCategory = asyncErrorHandler(async (req, res) => {
    const allCategory = await Category.find({})
    res.status(201).json({
        status: 'Success',
        data: {
            Category: allCategory
        }
    })
})



const updateCatgory = asyncErrorHandler(async (req, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({
        status: 'Success',
        data: {
            products: updatedCategory
        }
    })
})



const deleteCategory = asyncErrorHandler(async (req, res) => {
    const categoryId = req.params.id
    await Category.findByIdAndDelete(categoryId)
    res.status(200).json({
        status: 'Deleted'
    })
})









const getAllOrders = asyncErrorHandler(async (req, res) => {
    try {
        const productOrders = await ProductOrder.find()
            .populate('productId')
            .populate('userId', 'username')
            .exec();

        const orders = await Order.find()
            .populate('prdcts.productId')
            .populate('userId', 'username')
            .exec();

        const allPurchasedProducts = {
            productOrders,
            orders
        };

        res.status(200).json(allPurchasedProducts);
    } catch (error) {
        console.error('Error fetching purchased products:', error);
        res.status(500).json({ message: 'Server error' });
    }
})


module.exports = {
    getAllUsers,
    getUsersById,
    getProductByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    adminLogin,
    getAllProducts,
    createCategory,
    updateCatgory,
    deleteCategory,
    getAllCategory,
    getAllOrders
}