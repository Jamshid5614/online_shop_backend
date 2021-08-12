const mongoose = require('mongoose');



const shoppingCartSchema = new mongoose.Schema({
    rating: Number,
    brend: String,
    model: String,
    quantity: Number,
    images: [String],
    parent_category: {
        type: String,
        enum: [
            'laptops',
            'computers',
            'phones',
            'gadgets',
            'home_and_office_equipment',
            'toys_and_gifts',
            'clothes',
            'for_gamers',
            'car_accessories',
            'kitchen_appliances',
        ],
        default: [
            'laptops',
            'computers',
            'phones',
            'gadgets',
            'home_and_office_equipment',
            'toys_and_gifts',
            'clothes',
            'for_gamers',
            'car_accessories',
            'kitchen_appliances',
        ],
    },
    product_type: {
        type: String,
    },
    description: String,
    id: Number,
    additional_information: Object,
    price: Number
});

const ShoppingCartModel = mongoose.model('Shopping-carts',shoppingCartSchema);



module.exports = ShoppingCartModel;






