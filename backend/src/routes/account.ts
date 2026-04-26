import pool from '../db';
import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
    
        // TODO: Add password/email characteristic validation
        // Confirm email/password was provided
        if (!email || !password) {
            res.status(400);
        }

        // Confirm email is not already used in database
        const select_query = await pool.query(
            `SELECT * \
             FROM users \
             WHERE email = $1`, 
            [email]
        );
        if (select_query.rows.length > 0) {
            return res.status(409).json({
                error: "EMAIL_EXISTS",
                message: "A user with this email already exists."
            });
        }

        // Hash password before inserting in the database
        const password_hash = await bcrypt.hash(password, 10);

        // Insert credentials into database
        const insert_query = await pool.query(
            `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *`, 
            [email, password_hash]
        );

        // Confirm the entry was inserted into the database
        if (insert_query.rows.length > 0) {
            return res.status(200).json({
                msg: "Successfully created account!"
            });
        } else {
            throw new Error("Unsuccessful registering email/password.")
        }
    } catch(e) {
        console.error('Database query error: ', e);
        return res.status(500).json({
            msg: `${e}` 
        })
    }
});

export default router;