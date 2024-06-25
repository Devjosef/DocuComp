import { createClient } from '@supabase/supabase-js';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_KEY!);

// Input validation and sanitization
const validateUserInput = [
    body('username').isAlphanumeric().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Authentication and authorization
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Forbidden' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

export {
    validateUserInput,
    authenticateJWT,
    supabase
};