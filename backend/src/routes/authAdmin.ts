import express from 'express'
import { login, signup } from '../controllers/auth';

const authAdminRoutes = express.Router();

authAdminRoutes.post('/login', login);

authAdminRoutes.post('/signup', signup);


export { authAdminRoutes };
