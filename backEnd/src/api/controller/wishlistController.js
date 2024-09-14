const products = require('../model/productSchema');
const WishList = require('../model/wishlistSchema')
const asyncErrorHandler = require('../utils/asyncErrorHandler');

const addProductToWishList = asyncErrorHandler(async (req, res) => {
    const userId = req.params.id;
    const productId = req.body.product;
    const checkProduct = await products.findById(productId);
    if (!checkProduct) {
        res.status(404).json({ message: 'Product not found' })
    }
    const existingWishlist = await WishList.findOne({ User: userId })
    if (existingWishlist) {
        const existingProductWishlist = existingWishlist.Product.indexOf(productId)
        if (existingProductWishlist !== -1) {
            res.status(404).json({ message: 'Product already exist' })
        } else {
            existingWishlist.Product.push(productId)
            existingWishlist.save();
            res.status(200).json({
                status: 'Success',
                data: {
                    existingWishlist: existingWishlist
                }
            })
        }
    } else {
        const newWishlist = await WishList.create({ User: userId, Product: [productId] })
        res.status(200).json({
            status: 'Success',
            data: {
                newWishlist: newWishlist
            }
        })
    }
})



const getWishlistProduct = asyncErrorHandler(async (req, res) => {
    const userId = req.params.id;
    const getWishlist = await WishList.findOne({ User: userId })
    console.log(getWishlist);
    if (!getWishlist) {
        return res.status(200).json({
            status: 'Success',
            message: `Wishlist is empty`
        })
    }
    const wishlistItems = getWishlist.Product
    const wishlistProducts = await products.find({ _id: { $in: wishlistItems } })
    res.status(200).json({
        status: 'success',
        message: 'successfully fetched products',
        data: wishlistProducts
    })
})



const deleteProductWishlist = asyncErrorHandler(async (req, res) => {
    const userId = req.params.userId;
    const { productId } = req.body;

    const getWishlistUser = await WishList.findOne({ User: userId });

    if (!getWishlistUser) {
        return res.status(404).json({ message: `Wishlist not found for user with ID ${userId}` });
    }

    const deleteIndex = getWishlistUser.Product.indexOf(productId);

    if (deleteIndex === -1) {
        return res.status(404).json({ message: `Product not found in wishlist` });
    }

    getWishlistUser.Product.splice(deleteIndex, 1);
    await getWishlistUser.save();

    res.status(200).json({
        status: 'Success',
        message: 'Product successfully removed from wishlist',
    });
});


module.exports = {
    addProductToWishList,
    getWishlistProduct,
    deleteProductWishlist
}