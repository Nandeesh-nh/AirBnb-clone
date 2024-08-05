const Joi=require("joi");
const Schema =Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(1),
        category : Joi.string().required(),
        image: Joi.object({
                url: Joi.string(),
                filename: Joi.string()
              })
         
}).required();

const reviewSchema = Joi.object({
        review : Joi.object({
                rating: Joi.number().required().min(1).max(5),
                comment: Joi.string().required().max(50),
              
        }).required()
})

module.exports = {Schema,reviewSchema};