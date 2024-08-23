"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const router = express_1.default.Router();
router.post("/login", (0, validateRequest_1.default)(auth_validation_1.authValidation.loginUser), auth_controller_1.AuthController.loginUser);
router.post("/refresh-token", auth_controller_1.AuthController.refreshToken);
router.post("/change-password", (0, validateRequest_1.default)(auth_validation_1.authValidation.changePassword), (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.USER), auth_controller_1.AuthController.changePassword);
router.post("/forgot-password", (0, validateRequest_1.default)(auth_validation_1.authValidation.forgotPassword), auth_controller_1.AuthController.forgotPassword);
router.post("/reset-password", (0, validateRequest_1.default)(auth_validation_1.authValidation.resetPassword), auth_controller_1.AuthController.resetPassword);
exports.AuthRoutes = router;