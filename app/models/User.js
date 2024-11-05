"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/User.ts
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
var User = mongoose_1.default.models.User || mongoose_1.default.model('User', userSchema);
exports.default = User;
