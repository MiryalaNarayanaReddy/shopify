import express from 'express'

const authUserRoutes = express.Router();

authUserRoutes.post('/login', (req, res) => {
    res.send('User login');
});

authUserRoutes.post('/register', (req, res) => {
    res.send('User register');
});


export { authUserRoutes };
