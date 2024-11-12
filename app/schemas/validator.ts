import { Role } from "@/utils/constant";
import Joi from "joi";
const JoiInstance = Joi.defaults((schema) => {
  return schema.options({
    errors: {
      wrap: {
        // Remove quotes from variable names in error messages
        label: false,
      },
    },
  });
});
export const userSchema = Joi.object({
  name: Joi.string().trim().required().label("Name"),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().trim().min(6).required().label("Password"),
  yoe: Joi.string().trim().required().label("Year of Experience"),
  designation: Joi.string().trim().required().label("Designation"),
  role: Joi.string().trim().required().label("Role"),
  profilePic: Joi.any().optional().label("Profile Picture"),
  receiveNotifications: Joi.boolean().optional().default(false).label("Receive Notifications"),
});
export const settingSchema = JoiInstance.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().trim().min(6).required().label("Password"),
});
export const userFormSchema = JoiInstance.object({
  _id: Joi.string().trim().optional().empty().label("Id"),
  name: Joi.string().trim().required().label("Name"),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  yoe: Joi.string().trim().required().label("Year of Experience"),
  designation: Joi.string().trim().required().label("Designation"),
  role: Joi.string().trim().required().label("Role"),
    status: Joi.string().trim().required().label("Status"),
    profilePic: Joi.any().optional().label("Profile Picture"),
    receiveNotifications: Joi.boolean().optional().default(false).label("Receive Notifications"),
});

export const userPasswordSchema = JoiInstance.object({
  OldPassword: Joi.string().trim()
    .min(8)
    .max(30)
    .label("Old Password")
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+]{8,30}$'))  // Alphanumeric and special characters
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password cannot be longer than 30 characters.',
      'string.pattern.base': 'Password must contain only letters, numbers, and special characters (!@#$%^&*()_+).',
      'any.required': 'Old Password is required.'
    }),
    NewPassword: Joi.string().trim()
    .min(8)
    .max(30)
    .label("New Password")
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+]{8,30}$'))  // Alphanumeric and special characters
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password cannot be longer than 30 characters.',
      'string.pattern.base': 'Password must contain only letters, numbers, and special characters (!@#$%^&*()_+).',
      'any.required': 'New Password is required.'
    }),
    ConfirmPassword: Joi.string().trim()
    .min(8)
    .max(30)
    .label("Confirm Password")
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+]{8,30}$'))  // Alphanumeric and special characters
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password cannot be longer than 30 characters.',
      'string.pattern.base': 'Password must contain only letters, numbers, and special characters (!@#$%^&*()_+).',
      'any.required': 'Confirm Password is required.'
    }),
});

export const loginSchema = JoiInstance.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().trim().min(6).required().label("Password"),
});

export const userEditSchema = JoiInstance.object({
  name: Joi.string().trim().required().label("Name"),
  yoe: Joi.string().trim().required().label("Year of Experience"),
  designation: Joi.string().trim().required().label("Designation"),
  profilePic: Joi.any().optional().label("Profile Picture"),
  
});
export const eventId = JoiInstance.object({
  userId: Joi.string().trim().required().label("User Id"),
  caseId: Joi.string().trim().required().label("Case Id"),
});

export const caseEdit = JoiInstance.object({
  userId: Joi.string().trim().label("Owner").required(),
  description: Joi.string()
    .trim()
    .label("Description")
    .optional()
    .allow("")
    .allow(null),
  privacy: Joi.string().trim().required().label("Privacy"),
  assigne: Joi.array().items(Joi.string().trim()).label("Assignee"),
});
export const mode = JoiInstance.object({
  mode: Joi.string().valid("student", "teacher").required().label("Mode"),
});
export const rejectPayload = JoiInstance.object({
  rejectReason: Joi.string().trim().required().label("Reason"),
});
export const role = JoiInstance.object({
  role: Joi.string()
    .valid(Role.admin, Role.student, Role.teacher)
    .required()
    .label("Mode"),
  userId: Joi.string().trim().required().label("User Id"),
});
export const teachingForm = JoiInstance.object({
  profession: Joi.string().trim().required().label("Profession"),
  description: Joi.string().trim().required().label("Description"),
  teachingExperience: Joi.string()
    .trim()
    .required()
    .label("Teaching Experience"),
});

// export const  = JoiInstance.object({
//   email: Joi.string()
//     .email({ tlds: { allow: false } })
//     .required()
//     .label("Email"),
//   password: Joi.string().min(6).required().label("Password"),
// });

export const email = JoiInstance.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .label("Email"),
});
export const addCase = JoiInstance.object({
  privacy: Joi.string().trim().required().label("Privacy"),
  files: Joi.array().min(1).label("File"),
  description: Joi.string().allow("").optional().label("Description"),
  assigne: Joi.array().label("Collaborator"),
});
export const editUser = JoiInstance.object({
  name: Joi.string().trim().required().label("Name"),
  yoe: Joi.string().trim().required().label("Year of Experience"),
  designation: Joi.string().trim().required().label("Designation"),
});
export const userSetting = Joi.object({
  email: Joi.string().trim()
    .email({ tlds: { allow: false } })  // Validate email format
    .required(),
  
  password: Joi.string().trim()
    .min(8)
    .max(30)
    .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+]{8,30}$'))  // Alphanumeric and special characters
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password cannot be longer than 30 characters.',
      'string.pattern.base': 'Password must contain only letters, numbers, and special characters (!@#$%^&*()_+).',
      'any.required': 'Password is required.'
    }),
  confirmPassword: Joi.string().trim()
    .valid(Joi.ref('password'))  // Must match the 'password'
    .required()
    .messages({
      'any.only': 'Confirm password must match the password.',
      // 'any.required': 'Confirm password is required.'
    }).label("Confirm Password")
});