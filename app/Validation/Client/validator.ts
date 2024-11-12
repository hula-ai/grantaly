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


// Steps Project Initialization validation
export const ProjectStep1Schema = Joi.object({
  // Project Title validation
  projectTitle: Joi.string().min(2).required().messages({
    "string.empty": "Project title is required.",
    "string.min": "Project title must be at least 2 characters.",
  }),

  // Abstract validation
  abstract: Joi.string().min(2).required().messages({
    "string.empty": "Abstract is required.",
    "string.min": "Abstract must be at least 2 characters.",
  }),

  // Funding Agency validation
  fundingAgency: Joi.string().min(2).required().messages({
    "string.empty": "Funding agency is required.",
    "string.min": "Funding agency must be at least 2 characters.",
  }),

  // Start Date validation
  startDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
    "string.empty": "Start date is required.",
    "string.pattern.base": "Start date must be in the format YYYY-MM-DD.",
  }),

  // End Date validation
  endDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
    "string.empty": "End date is required.",
    "string.pattern.base": "End date must be in the format YYYY-MM-DD.",
  }),

  // Expected Timeline validation
  expectedTimeline: Joi.string().max(10).required().messages({
    "string.empty": "Expected timeline is required.",
    "string.min": "Expected timeline must be at least 5 characters.",
  }),
});

