import express from 'express';
import * as AuthController from "../controllers/auth"

const router = express();

//Route to handle login
router.post("/login", AuthController.login);

//Route to handle new access token from refresh token
router.post("/refreshAccessToken", AuthController.refreshAccessToken);

export default router;