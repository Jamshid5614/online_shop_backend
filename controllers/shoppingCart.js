const Model = require('../models/shoppingCart');
const Joi = require('joi');

exports.addToShoppingCart = async (req,res) => {

    const data = validateWithJoi(req.body);

    if(!data.success)
        return res.status(400).json(data);

    const isExist = await Model.findOne({...data});
    if(isExist)
        return res.status(400).json({success: false,errorMsg: "This product already added to shopping cart"});
    
    const shoppingCarts = await Model.find();
    const newShoppingCart = await new Model({...data.payload,id: shoppingCarts.length + 1});

    newShoppingCart.save();

    res.json({success: true,payload: newShoppingCart});


};



exports.deleteProductFromShoppingCart = async (req,res) => {
    
        const result = await Model.deleteOne({_id: req.params.id});
    
        if(!result)
            return res.status(400).json({success: false,errorMsg: 'Can not delete this shopping cart'});
    
        res.json({success: true, payload: result});

    
};



exports.getShoppingCartById = async (req,res) => {
    const findedShoppingCart = await Model.findOne({_id: req.params.id});

    if(!findedShoppingCart) 
        return res.status(404).send({success: false,errorMsg: 'Shopping cart not found'});

    res.json({success: true,payload: findedShoppingCart});

}

exports.updateShoppingCart = async (req,res) => {
    
        const result = await Model.updateOne(req.body);
    
        if(!result)
            return res.status(400).json({success: true, errorMsg: 'Can not update this product'});
    
        res.json({success: true,payload: result});

    
}


function validateWithJoi(data) {
    
    const schema = Joi.object({
        model: Joi.string().required(),
        brend: Joi.string().required(),
        rating: Joi.string().required(),
        parent_category: Joi.string().required(),
        product_type: Joi.string().required(),
        description: Joi.string().required(),
        additional_information: Joi.object().required(),
        price: Joi.string().required(),
    });
    const validationResult = schema.validate(data);
    const {error} = validationResult;

    if(error) 
        return {success: false,errorMsg: `${error.details[0].message.replace(/['"','\']/g,'')}`};

    return {success: true,payload: data};
}