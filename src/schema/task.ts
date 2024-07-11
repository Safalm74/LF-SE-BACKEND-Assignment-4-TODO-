import Joi from "joi";

export const updateTaskBodySchema=Joi.object(
    {
        name:Joi.string().required().messages(
            {
                "any.required":"Name is required",
            }
        ),
        user_id: Joi.string().required().messages({
            "number.base": "User ID must be a number",
          })
    }
).options(
    {
        stripUnknown:true,
    }
);

export const createTaskBodySchema=Joi.object(
    {
        name:Joi.string().required().messages(
            {
                "any.required":"Name is required",
            }
        )
    }
).options(
    {
        stripUnknown:true,
    }
);

export const taskParamSchema=Joi.object(
    {
        id:Joi.number().optional().messages({
            "number.base": "id must be a number",
          })
    }
);
