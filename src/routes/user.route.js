import { Router } from "express";

// Importiere alle exports aus dem auth-Controller als ein Objekt 'authController'
import * as userController from '../controllers/user.controller.js';

// Importiere nötige Middleware-Funktionen
import { validateToken } from '../middlewares/auth.middleware.js';

// Instanziiere neuen Router
const router = Router();

// Registriere Middleware für alle Endpoints des Routers
// router.use(validateToken);

// Definiere Endpoints für userRouter
// GET-Endoint ohne Middleware vor dem Controller (öffentlicher Endpoint)
router.get('/', userController.getAll);

// GET-Endoint mit Middleware vor dem Controller (privater Endpoint)
router.get('/:id', validateToken, userController.getById);

// PUT-Endpoint mit Token-Validierungs-Middleware (privater Endpoint)
router.put('/:id', validateToken, userController.updateById);




export default router;