import Joi from "joi";

//Schema to get id from params
export const taskParamSchema=Joi.object(
    {
        id:Joi.number().optional().messages({
            "number.base": "id must be a number",
          })
    }
);

//Schema to create user
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

//Schema to update user
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

//Schema to delete user
export const deleteTaskBodySchema=Joi.object(
    {
        user_id: Joi.string().required().messages({
            "number.base": "User ID must be a number",
          })
    }
).options(
    {
        stripUnknown:true,
    }
);
