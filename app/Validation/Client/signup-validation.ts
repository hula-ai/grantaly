// validation/userSchema.js
import Joi from 'joi';

export const SignUpValidation = Joi.object({
  firstName: Joi.string().min(2).required().messages({
    "string.empty": "First name is required.",
    "string.min": "First name must be at least 2 characters.",
  }),
  lastName: Joi.string().min(2).required().messages({
    "string.empty": "Last name is required.",
    "string.min": "Last name must be at least 2 characters.",
  }),
  contact: Joi.string().pattern(/^[0-9]+$/).min(10).required().messages({
    "string.empty": "Contact number is required.",
    "string.pattern.base": "Contact number must be numeric.",
    "string.min": "Contact number must be at least 10 digits.",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email is required.",
  }),
  
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 8 characters.",
    "string.empty": "Password is required.",
  }),
  confirmPassword: Joi.any().equal(Joi.ref('password')).required().messages({
    "any.only": "Confirm password must match the password.",
  }),
});

export const ContactUsValidation = Joi.object({
  firstName: Joi.string().min(2).required().messages({
    "string.empty": "First name is required.",
    "string.min": "First name must be at least 2 characters.",
  }),
  lastName: Joi.string().min(2).required().messages({
    "string.empty": "Last name is required.",
    "string.min": "Last name must be at least 2 characters.",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email is required.",
  }),
  phone: Joi.string().pattern(/^[0-9]+$/).min(10).required().messages({
    "string.empty": "Phone number is required.",
    "string.pattern.base": "Phone number must contain only digits.",
    "string.min": "Phone number must be at least 10 digits.",
  }),
  message: Joi.string().min(10).required().messages({
    "string.empty": "Message is required.",
    "string.min": "Message must be at least 10 characters.",
  }),
});
