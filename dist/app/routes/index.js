"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const pet_routes_1 = require("../modules/pet/pet.routes");
const adoption_routes_1 = require("../modules/AdoptionRequest/adoption.routes");
const blog_routes_1 = require("../modules/blog/blog.routes");
const comment_routes_1 = require("../modules/comment/comment.routes");
const donate_routes_1 = require("../modules/donate/donate.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/pets",
        route: pet_routes_1.petRoutes,
    },
    {
        path: "/adoption-requests",
        route: adoption_routes_1.adoptionRequestRoutes,
    },
    {
        path: "/blog",
        route: blog_routes_1.blogRoutes,
    },
    {
        path: "/comment",
        route: comment_routes_1.commentRoutes,
    },
    {
        path: "/donate",
        route: donate_routes_1.donateRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
