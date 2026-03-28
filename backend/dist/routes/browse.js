"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const db_query = await db_1.default.query(`
        SELECT * \
        FROM sets`);
        return res.status(200).json(db_query.rows);
    }
    catch (e) {
        console.error('Database query error: ', e);
        res.status(500).json({ error: 'Database Request Error' });
    }
});
router.get('/set/:id', async (req, res) => {
    try {
        const set_id = req.params.id;
        console.log('set_id: ', set_id);
        console.log('typeof set_id: ', typeof set_id);
        if (typeof set_id !== "string") {
            return res.status(400).send("Invalid ID");
        }
        const set_id_int = parseInt(set_id, 10);
        console.log('set_id_int', set_id_int);
        if (isNaN(set_id_int)) {
            return res.status(400).send("Invalid ID");
        }
        ;
        const db_query = await db_1.default.query('SELECT * \
                                         FROM cards \
                                         WHERE set_id = $1', [set_id_int]);
        return res.status(200).json(db_query.rows[0]);
    }
    catch (e) {
        console.error('Database query error: ', e);
        res.status(500).json({ error: 'Database Request Error' });
    }
});
exports.default = router;
//# sourceMappingURL=browse.js.map