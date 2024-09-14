const Cart = require('../model/cartSchema');
const products = require('../model/productSchema');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const Order = require('../model/orderSchema');
const Stripe = require('stripe');
const user = require('../model/userSchema');
const ProductOrder = require('../model/productOrderSchema');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const prdcts = asyncErrorHandler(async (req, res) => {
    const newProduct = await products.create(req.body)
    res.status(201).json({
        status: 'Success',
        data: {
            products: newProduct
        }
    })
})

const getAllProducts = asyncErrorHandler(async (req, res) => {
    const allProducts = await products.find()
    res.status(200).json({
        status: 'Success',
        data: {
            products: allProducts
        }
    })
})

const getProductByCategory = asyncErrorHandler(async (req, res) => {
    const category = req.params.category
    const categoryProduct = await products.find({ category })
    console.log(categoryProduct);
    if (categoryProduct.length === 0) {
        return res.status(404).json({ message: "Category does not exist" })
    } else {
        res.status(200).json({
            status: 'Success',
            data: {
                products: categoryProduct
            }
        })
    }
})


const getProductById = asyncErrorHandler(async (req, res) => {
    const productId = req.params.id;
    const prdctId = await products.findById(productId)
    if (!prdctId) {
        return res.status(404).json({ message: "Product does not exist" })
    } else {
        res.status(200).json({
            status: 'Success',
            data: {
                products: prdctId
            }
        })
    }
})







//Order&Payment


const payment = asyncErrorHandler(async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const userId = req.params.id
    const cartModel = await Cart.findOne({ User: userId })
    const usr = await user.findById({ _id: userId })
    const PRDCT = await products.find({ _id: cartModel.Product });
    if (!usr) {
        return res.status(200).json({
            status: 'Success',
            message: 'User cart is empty',
            data: []
        })
    }
    const lineItem = PRDCT.map((item) => {
        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.title,
                    description: item.description
                },
                customer: cartModel.User,
                unit_amount: Math.round(item.price * 100)
            },
            quantity: 1
        }
    })

    const customer = await stripe.customers.create({
        name: usr.username,
        address: {
            line1: 'Moyan 123',
            city: 'Vengara',
            state: 'kerala',
            postal_code: '123456',
            country: 'IN'
        }
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItem,
        mode: 'payment',
        customer: customer.id,
        success_url: `http://localhost:3000/users/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:3000/users/payment/cancel',
        metadata: {
            userId,
            prdcts: JSON.stringify(cartModel.Product),
            purchaseDate: new Date().toISOString(),
            totalPrice: cartModel.TotalPrice
        }
    })

    if (session) {

        res.status(200).json({
            status: 'Success',
            session: session.url
        })
    } else {
        res.status(404).json({
            status: 'Failed'
        })
    }
})




const confirmPayment = asyncErrorHandler(async (req, res) => {
    const { sessionId } = req.body;

    if (typeof sessionId !== 'string' || sessionId.trim() === '') {
        return res.status(400).json({ status: 'Failed', message: 'Invalid session ID' });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid') {
            const { userId, prdcts, purchaseDate, totalPrice } = session.metadata;

            const parsedPrdcts = JSON.parse(prdcts);

            const order = new Order({
                userId,
                prdcts: parsedPrdcts.map(p => ({ productId: p, quantity: 1 })),
                purchaseDate,
                totalPrice
            });

            await order.save();

            return res.status(200).json({ status: 'Success', message: 'Payment successfully completed and order saved' });
        } else {
            return res.status(400).json({ status: 'Failed', message: 'Payment not completed' });
        }
    } catch (error) {
        console.error('Error confirming payment:', error);
        return res.status(500).json({
            status: 'Failure',
            message: 'Something went wrong...!',
            error: error.message
        });
    }
});





const singlePayment = asyncErrorHandler(async (req, res) => {
    const { productId, userId } = req.body;

    try {
        const product = await products.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const users = await user.findById(userId);
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }

        const customer = await stripe.customers.create({
            name: users.username,
            address: {
                line1: 'Moyan 123',
                city: 'Vengara',
                state: 'kerala',
                postal_code: '123456',
                country: 'IN'
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.title,
                            description: product.description,
                            images: [product.image],
                        },
                        unit_amount: Math.round(product.price * 100),
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            customer: customer.id,
            success_url: `http://localhost:3000/user/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/user/payment/cancel`,
            metadata: {
                userId: userId,
                productId: productId,
                totalPrice: product.price.toFixed(2),
                quantity: 1
            },
        });

        if (session) {
            return res.status(200).json({
                status: 'Success',
                session: session.url,
            });
        } else {
            return res.status(500).json({
                status: 'Failed to create session',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Error',
            message: 'Something went wrong during payment processing',
        });
    }
});





const productConfirmPayment = asyncErrorHandler(async (req, res) => {
    const { sessionId } = req.body;

    if (typeof sessionId !== 'string' || sessionId.trim() === '') {
        return res.status(400).json({ status: 'Failed', message: 'Invalid session ID' });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid') {
            const { userId, productId, totalPrice, quantity } = session.metadata;

            const parsedQuantity = parseInt(quantity, 10);
            const parsedTotalPrice = parseFloat(totalPrice);

            if (isNaN(parsedQuantity) || isNaN(parsedTotalPrice)) {
                return res.status(400).json({
                    status: 'Failed',
                    message: 'Invalid quantity or total price'
                });
            }

            const order = new ProductOrder({
                userId,
                productId,
                quantity: parsedQuantity,
                totalAmount: parsedTotalPrice,
                paymentStatus: 'Completed',
                paymentMethod: 'Stripe',
                paymentDetails: {
                    sessionId,
                    ...session
                },
                orderStatus: 'Processing'
            });

            await order.save();

            return res.status(200).json({ status: 'Success', message: 'Payment successfully completed and order saved' });
        } else {
            return res.status(400).json({ status: 'Failed', message: 'Payment not completed' });
        }
    } catch (error) {
        console.error('Error confirming payment:', error);
        return res.status(500).json({
            status: 'Failure',
            message: 'Something went wrong...',
            error: error.message
        });
    }
});










module.exports = {
    prdcts,
    getAllProducts,
    getProductByCategory,
    getProductById,
    payment,
    confirmPayment,
    singlePayment,
    productConfirmPayment
}