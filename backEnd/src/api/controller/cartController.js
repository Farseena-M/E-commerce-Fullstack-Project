const asyncErrorHandler = require('../utils/asyncErrorHandler')
const Cart = require('../model/cartSchema')
const products = require('../model/productSchema');

const addProductToCart = asyncErrorHandler(async (req, res) => {
    const userId = req.params.id;
    const productId = req.body.product;
    const checkProduct = await products.findById(productId);
    if (!checkProduct) {
        res.status(404).json({ message: 'Product not found' })
    }
    const existingCart = await Cart.findOne({ User: userId })
    if (existingCart) {
        const existingProductCart = existingCart.Product.indexOf(productId)
        if (existingProductCart !== -1) {
            res.status(404).json({ message: 'Product already exist' })
        } else {
            existingCart.Product.push(productId)
            existingCart.TotalPrice += checkProduct.price
            existingCart.save();
            res.status(200).json({
                status: 'Success',
                data: {
                    existingCart: existingCart
                }
            })
        }
    } else {
        const newCart = await Cart.create({ User: userId, Product: [productId] })
        res.status(200).json({
            status: 'Success',
            data: {
                newCart: newCart
            }
        })
    }
})


const getCartProduct = asyncErrorHandler(async (req, res) => {
    const userId = req.params.id
    const getCart = await Cart.findOne({ User: userId })
    console.log(getCart);
    if (!getCart) {
        return res.status(200).json({
            status: 'Success',
            message: `cart is empty`
        })
    }
    const cartItems = getCart.Product
    const cartProducts = await products.find({ _id: { $in: cartItems } })
    res.status(200).json({
        status: 'success',
        message: 'successfully fetched products',
        data: cartProducts
    })

})



const deleteProductCart = asyncErrorHandler(async (req, res) => {
    const userId = req.params.id;
    const { productId } = req.body;

    const getCartUser = await Cart.findOne({ User: userId });

    if (!getCartUser) {
        return res.status(404).json({ message: `Cart not found for user with ID ${userId}` });
    }

    const deleteIndex = getCartUser.Product.indexOf(productId);

    if (deleteIndex === -1) {
        return res.status(404).json({ message: `Product not found in cart` });
    }

    getCartUser.Product.splice(deleteIndex, 1);
    await getCartUser.save();

    res.status(200).json({
        status: 'Success',
        message: 'Product successfully removed from cart',
    });
});





// const updateQuantity = asyncErrorHandler(async(req,res)=>{
//     const { userId } = req.params;
//     const { productId, quantity } = req.body;

//     try {
//       const cart = await Cart.findOne({ userId });

//       if (!cart) {
//         return res.status(404).json({ message: 'Cart not found' });
//       }

//       const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

//       if (itemIndex === -1) {
//         return res.status(404).json({ message: 'Item not found in cart' });
//       }

//       if (quantity <= 0) {
//         cart.items.splice(itemIndex, 1);
//       } else {
//         cart.items[itemIndex].quantity = quantity;
//       }

//       await cart.save();

//       res.status(200).json({ data: cart });
//     } catch (err) {
//       res.status(500).json({ message: 'Server error' });
//     }
// })






module.exports = {
    addProductToCart,
    getCartProduct,
    deleteProductCart,
    // updateQuantity
}