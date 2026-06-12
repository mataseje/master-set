import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';

import pool from '../db';
import { requireEnv } from '../common';

const router = Router();

// Cookie parameters for consistent setting/clearing of refresh tokens
const cookie_options = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  path: "/auth/refresh",
};


router.post('/register', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
    
        // TODO: Add password/email characteristic validation
        // Confirm email/password was provided
        if (!email || !password) {
            throw new Error("Email/Password not provided.")
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
            `INSERT INTO users (email, password_hash) \
             VALUES ($1, $2) \
             RETURNING *`, 
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

router.post('/login', async (req: Request, res: Response) => {
    /**
     * For a user to login, perform the following actions: 
     *  - Validate user exists and credentials are correct
     *  - Create access token and refresh token
     *  - Hash the refresh token and insert into database
     *  - Return access token in json body, and refresh token in http header
     */
    try {
        const { email, password } = req.body;
    
        // Confirm email/password was provided
        if (!email || !password) {
            throw new Error("Email/Password not provided.")
        }

        // Confirm email exists in database
        const user_query = await pool.query(
            `SELECT * \
             FROM users \
             WHERE email = $1`, 
            [email]
        );
        // Confirm email is in the database
        if (user_query.rows.length === 0) {
            return res.status(409).json({
                error: "EMAIL_DOES_NOT_EXIST",
                message: "No user found with that email"
            });
        }
        const user = user_query.rows[0];

        // Compare the provided password with the hashed password 
        const valid_password = await bcrypt.compare(password, user.password_hash);

        // Throw error if the password/email combo was invalid
        if (!valid_password) {
            throw new Error("Unsuccessful login, confirm email/password.")
        }

        // Generate access token
        const access_token = jwt.sign(
            { sub: user.user_id, email: user.email },
            requireEnv("ACCESS_TOKEN_SECRET"),
            { expiresIn: "5m" }
        );

        // Generate refresh token
        const refresh_token = crypto.randomBytes(32).toString("base64url");
        const hashed_refresh_token = crypto.createHash('sha256')
                                           .update(refresh_token)
                                           .digest('hex');
        // Insert refresh token into database
        const refresh_insert = await pool.query(
            `INSERT INTO refresh_tokens (refresh_token, user_id) \
             VALUES ($1, $2)`, 
            [hashed_refresh_token, user.user_id]
        );

        return res
            .status(200)
            .cookie("refresh_token", refresh_token, cookie_options)
            .json({
                access_token: access_token,
                msg: "Successfully logged in!"
            });

    } catch(e) {
        console.error('Database query error: ', e);
        return res.status(500).json({
            msg: `${e}` 
        })
    }
});


router.post('/refresh', async (req: Request, res: Response) => {
    /**
     * Validate the user's refresh token, and if its still valid, 
     * generate a new access token and return it to the user.
     * 
     * If the refresh token is invalid, return an error which should
     * redirect the user to logout.
     */
    try {

        // Retrieve user's refresh token
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token){
            return res.status(401).json({error: "No refresh token"});
        }

        // Hash the refresh token with crypto's 256-sha algo
        const hashed_refresh_token = crypto.createHash('sha256')
                                    .update(refresh_token)
                                    .digest('hex');

        // Check for the hashed token in the database
        const refresh_select = await pool.query(
            "SELECT user_id, expires_at FROM refresh_tokens \
             WHERE hashed_refresh_token = $1", 
             [hashed_refresh_token]
        );

        // Validate token exists within the database 
        if (refresh_select.rows.length !== 1){
            console.error(`Invalid number of refresh tokens found in database: (${refresh_select.rows.length}).`);
            res.clearCookie("refresh_token", cookie_options);
            return res.status(401).json({error: "Invalid refresh token"});
        }

        // Validate the token is not expired
        const db_token = refresh_select.rows[0]
        const db_token_expires_at = new Date(db_token.expires_at).getTime();
        if (db_token_expires_at <= Date.now()){
            console.error(`Refresh token expired: (${db_token.expires_at}).`);
            res.clearCookie("refresh_token", cookie_options);
            return res.status(401).json({error: "Expired refresh token"});
        }

        // Rotate refresh token in database
        const new_refresh_token = crypto.randomBytes(32).toString("base64url");
        const new_hashed_token = crypto.createHash('sha256')
                                           .update(new_refresh_token)
                                           .digest('hex');
        const rotate_query = await pool.query(
            "UPDATE refresh_tokens \
                SET token_hash = $1, \
                    expires_at = NOW() + INTERVAL '7 days', \
                    updated_at = NOW() \
                WHERE user_id = $2",
            [new_hashed_token, db_token.user_id]
        );

        // Generate new access token
        const new_access_token = jwt.sign(
            { sub: db_token.user_id },
            requireEnv("ACCESS_TOKEN_SECRET"),
            { expiresIn: "5m" }
        );

        // Return new access token and refresh token
        return res
            .status(200)
            .cookie("refresh_token", new_refresh_token, cookie_options)
            .json({
                access_token: new_access_token,
                msg: "Access token has been refreshed"
            });

    } catch (e) {
        console.log(e)
    }

});


router.post('/logout', async (req: Request, res: Response) => {
    /**
     * Perform the following functions: 
     *  - Revoke refresh token in the database
     *  - Clear the refresh token cookie
     *  - Provide response for frontend re-routing
     */
    try {
        // Retrieve the user's refresh token
        const refresh_token = req.cookies.refresh_token;
        if (!refresh_token){
            console.log("No refresh token found ... Logged out")
            return res.status(200).json({msg: "Logged out"});
        }

        // Hash the token before comparing to database
        const hashed_refresh_token = crypto.createHash('sha256')
                                    .update(refresh_token)
                                    .digest('hex');
        
        // Remove refresh token from the database
        const delete_query = await pool.query(
            "DELETE FROM refresh_tokens \
             WHERE hashed_refresh_token = $1", 
             [hashed_refresh_token]
        );

        res.clearCookie("refresh_token", cookie_options);
        return res.status(200).json({msg: "Successfully Logged out"});

    } catch (e) {
        console.log(e)
    }

});

export default router;