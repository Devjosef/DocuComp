import { createClient } from '@supabase/supabase-js';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_KEY!);

// Input validation and sanitization
const validateUserInput = [
    body('username').isAlphanumeric().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    (req: any, res: any, next: any) => { // Add type annotations
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Authentication and authorization
const authenticateJWT = (req: any, res: any, next: any) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Access token is invalid' });
        }
        req.user = user;
        next();
    });
};

export {
    validateUserInput,
    authenticateJWT,
    supabase
};