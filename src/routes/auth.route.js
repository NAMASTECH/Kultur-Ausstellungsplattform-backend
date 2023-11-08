import { Router } from "express";

// Importiere alle exports aus dem auth-Controller als ein Objekt 'authController'
import * as authController from '../controllers/auth.controller.js';

// Instanziiere neuen Router
const router = Router();

// Definiere Endpoints für authRouter
router.post('/register/organizer', authController.registerNewOrganizer);
router.post('/register/user', authController.registerNewUser);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);



export default router;