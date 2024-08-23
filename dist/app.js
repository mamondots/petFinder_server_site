"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const app = (0, express_1.default)();
const url = "https://pet-adoption-frontend-henna.vercel.app";
// const url = "http://localhost:3000"
//* Middleware
app.use((0, cors_1.default)({ origin: url, credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Pet Adoption Server Running!");
});
//* routes
app.use("/api", routes_1.default);
//* middlewares
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
