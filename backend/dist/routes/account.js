"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)();
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        // TODO: Add password/email characteristic validation
        // Confirm email/password was provided
        if (!email || !password) {
            res.status(400);
        }
        // Confirm email is not already used in database
        const select_query = await db_1.default.query(`SELECT * \
             FROM users \
             WHERE email = $1`, [email]);
        if (select_query.rows.length > 0) {
            return res.status(409).json({
                error: "EMAIL_EXISTS",
                message: "A user with this email already exists."
            });
        }
        // Hash password before inserting in the database
        const password_hash = await bcrypt_1.default.hash(password, 10);
        // Insert credentials into database
        const insert_query = await db_1.default.query(`INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *`, [email, password_hash]);
        // Confirm the entry was inserted into the database
        if (insert_query.rows.length > 0) {
            return res.status(200).json({
                msg: "Successfully created account!"
            });
        }
        else {
            throw new Error("Unsuccessful registering email/password.");
        }
    }
    catch (e) {
        console.error('Database query error: ', e);
        return res.status(500).json({
            msg: `${e}`
        });
    }
});
exports.default = router;
//# sourceMappingURL=account.js.map