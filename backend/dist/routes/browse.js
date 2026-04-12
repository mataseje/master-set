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
        FROM tcgs`);
        return res.status(200).json(db_query.rows);
    }
    catch (e) {
        console.error('Database query error: ', e);
        res.status(500).json({ error: 'Database Request Error' });
    }
});
router.get('/sets/:tcg_slug', async (req, res) => {
    try {
        const tcg_slug = req.params.tcg_slug;
        console.log('tcg_slug: ', tcg_slug);
        if (typeof tcg_slug !== "string") {
            return res.status(400).send("Invalid ID");
        }
        // INNER JOIN tcgs ON sets.tcg_id = tcg.tcg_id \
        const db_query = await db_1.default.query(`
        SELECT * \
        FROM sets \
        INNER JOIN tcgs ON sets.tcg_id = tcgs.tcg_id \
        WHERE tcgs.tcg_slug = $1 \
        ORDER BY set_id ASC`, [tcg_slug]);
        return res.status(200).json(db_query.rows);
    }
    catch (e) {
        console.error('Database query error: ', e);
        res.status(500).json({ error: 'Database Request Error' });
    }
});
router.get('/cards/:set_slug', async (req, res) => {
    try {
        const set_slug = req.params.set_slug;
        if (typeof set_slug !== "string") {
            return res.status(400).send("Invalid ID");
        }
        const db_query = await db_1.default.query(` 
        SELECT * \
        FROM cards \
        INNER JOIN sets ON cards.set_id = sets.set_id \
        INNER JOIN tcgs ON cards.tcg_id = tcgs.tcg_id \
        WHERE sets.set_slug = $1 \
        ORDER BY card_name ASC`, [set_slug]);
        return res.status(200).json(db_query.rows);
    }
    catch (e) {
        console.error('Database query error: ', e);
        res.status(500).json({ error: 'Database Request Error' });
    }
});
exports.default = router;
//# sourceMappingURL=browse.js.map