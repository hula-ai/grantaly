import Joi from 'joi';

// Forgot Password Schema
export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
});

// Sign-Up Schema
export const signUpSchema = Joi.object({
  firstName: Joi.string().min(2).required().messages({
    'string.min': 'First name must be at least 2 characters',
    'any.required': 'First name is required',
  }),
  lastName: Joi.string().min(2).required().messages({
    'string.min': 'Last name must be at least 2 characters',
    'any.required': 'Last name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  contact: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required().messages({
    'string.pattern.base': 'Contact must be a valid number',
    'string.min': 'Contact must be at least 10 digits',
    'string.max': 'Contact must be no more than 15 digits',
    'any.required': 'Contact is required',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'any.required': 'Password is required',
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Passwords do not match',
    'any.required': 'Confirm password is required',
  }),
});

export const resetPasswordSchema = Joi.object({
    token: Joi.string().required().messages({
      'any.required': 'Token is required',
    }),
    password: Joi.string().min(8).required().messages({
      'string.min': 'Password must be at least 8 characters',
      'any.required': 'Password is required',
    }),
  });

  export const contactUsSchema = Joi.object({
    firstName: Joi.string().required().messages({
      'string.empty': 'First name is required',
    }),
    lastName: Joi.string().required().messages({
      'string.empty': 'Last name is required',
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email',
      'string.empty': 'Email is required',
    }),
    contact: Joi.string().optional(),
    message: Joi.string().required().messages({
      'string.empty': 'Message is required',
    }),
  });

export const projectSchema = Joi.object({
  projectTitle: Joi.string().required().messages({
    'string.empty': 'Project title is required',
  }),
  abstract: Joi.string().required().messages({
    'string.empty': 'Abstract is required',
  }),
  fundingAgency: Joi.string().required().messages({
    'string.empty': 'Funding agency is required',
  }),
  // startDate: Joi.date().required().messages({
  //   'date.base': 'Start date must be a valid date',
  //   'any.required': 'Start date is required',
  // }),
  // endDate: Joi.date().min(Joi.ref('startDate')).required().messages({
  //   'date.base': 'End date must be a valid date',
  //   'date.min': 'End date must be after start date',
  //   'any.required': 'End date is required',
  // }),
  expectedTimeline: Joi.string().required().messages({
    'string.empty': 'Expected timeline is required',
  })
});

export const uploadSchema = Joi.object({
  fileName: Joi.string().required().messages({
    'any.required': 'File name is required',
  }),
  fileType: Joi.string().required().messages({
    'any.required': 'File type is required',
  }),
});