"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.donateRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const donate_controller_1 = require("./donate.controller");
const donate_validation_1 = require("./donate.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.USER), (0, validateRequest_1.default)(donate_validation_1.donationValidation.createDonationSchema), donate_controller_1.donateController.createDonation);
router.get("/", donate_controller_1.donateController.getAllDonation);
router.get("/user-donations", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.USER), donate_controller_1.donateController.getDonationsByUser);
router.get("/:donateId", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN, client_1.UserRole.USER), donate_controller_1.donateController.getADonation);
router.put("/:donateId", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(donate_validation_1.donationValidation.updateDonationSchema), donate_controller_1.donateController.updateADonate);
router.delete("/:donateId", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), donate_controller_1.donateController.deleteADonate);
exports.donateRoutes = router;
