import Joi from "joi";

const roles=['super_user','user'];

//Schema to get id from params
export const userParamSchema=Joi.object(
    {
        id:Joi.number().optional().messages({
            "number.base": "id must be a number",
          })
    }
);

//Schema to get user
export const getUserQuerySchema = Joi.object({
  q: Joi.string().optional(),

  page: Joi.number().optional().messages({
    "number.base": "page must be a number",
  }),
}).options(
    {
        stripUnknown:true,
    }
);

//Schema to create user
export const createUserBodySchema=Joi.object(
    {
        name:Joi.string().required().messages(
            {
                "any.required":"Name is required",
            }
        ),
        role:Joi.string().required().messages(
            {
                "any.required":"role is required",
                "role.not_defined":"Possible roles: super_user and user"
            }
        ).custom((value,helpers)=>{
            if (!roles.includes(value)){
                return helpers.error("role.not_defined");
            }
        
            return value;
        }),
        email:Joi.string().email().required().messages(
            {
                "strng.email":"Email must be a valid format", 
                "any.required":"Email is required",
            }
        ),
        password:Joi.string().min(8).required().messages(
            {
                "any.required":"Pasword is required",
                "string.min":"Password must be atleast of 8 character",
                "password.uppercase":"Password must contain atleast a uppercase",
                "password.lowercase":"Password must contain atleast a lowercase",
                "password.special":"Password must contain atleast a special character"
            }).custom((value,helpers)=>{
                if (!/[A-Z]/.test(value)){
                    return helpers.error("password.uppercase");
                }  

                if (!/[a-z]/.test(value)){
                    return helpers.error("password.lowercase");
                }

                if (!/[!@#$%^&*]/.test(value)){
                    return helpers.error("password.special");
                }
            
                return value;
            }
        )
    }
).options(
    {
        stripUnknown:true,
    }
);

//Schema to update user
export const updateUserBodySchema=Joi.object(
    {
        name:Joi.string().optional().messages(
            {
                "any.required":"Name is required",
            }
        ),
        role:Joi.string().optional().messages(
            {
                "any.required":"role is required",
                "role.not_defined":"Possible roles: super_user and user"
            }
        ).custom((value,helpers)=>{
            if (!roles.includes(value)){
                return helpers.error("role.not_defined");
            }
        
            return value;
        }),
        email:Joi.string().email().optional().messages(
            {
                "strng.email":"Email must be a valid format", 
                "any.required":"Email is required",
            }
        ),
        password:Joi.string().min(8).optional().messages(
            {
                "any.required":"Pasword is required",
                "string.min":"Password must be atleast of 8 character",
                "password.uppercase":"Password must contain atleast a uppercase",
                "password.lowercase":"Password must contain atleast a lowercase",
                "password.special":"Password must contain atleast a special character"
            }).custom((value,helpers)=>{
                if (!/[A-Z]/.test(value)){
                    return helpers.error("password.uppercase");
                }  

                if (!/[a-z]/.test(value)){
                    return helpers.error("password.lowercase");
                }

                if (!/[!@#$%^&*]/.test(value)){
                    return helpers.error("password.special");
                }
            
                return value;
            }
        )
    }
).options(
    {
        stripUnknown:true,
    }
);