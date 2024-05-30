import express from 'express'
import { login, signup } from '../controllers/auth';

const authUserRoutes = express.Router();

authUserRoutes.post('/login', login);
authUserRoutes.post('/signup', signup);


export { authUserRoutes };