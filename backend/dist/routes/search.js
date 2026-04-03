"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const search_query = req.query.search;
    console.log('search_query: ');
    try {
        const db_query = await db_1.default.query(`
        SELECT * \
        FROM cards \
        INNER JOIN sets ON cards.set_id = sets.set_id \
        WHERE card_name ILIKE $1`, [`%${search_query}%`]);
        console.log('db_query: ', db_query);
        return res.status(200).json(db_query.rows);
    }
    catch (e) {
        console.error('Database query error: ', e);
        res.status(500).json({ error: 'Database Request Error' });
    }
});
exports.default = router;
//# sourceMappingURL=search.js.map