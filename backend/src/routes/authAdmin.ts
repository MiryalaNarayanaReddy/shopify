import express from 'express'

const authAdminRoutes = express.Router();

authAdminRoutes.post('/login', (req, res) => {
    res.send('Admin login');
});

authAdminRoutes.post('/register', (req, res) => {
    res.send('Admin register');
});


export { authAdminRoutes };
