import jwt from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();




function authCheck(req: express.Request, res: express.Response, next: express.NextFunction) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied');

    try {
        // @ts-ignore
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // @ts-ignore
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

export { authCheck };