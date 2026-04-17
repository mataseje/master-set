"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/:card_id', async (req, res) => {
    try {
        const card_id = req.params.card_id;
        console.log('card_id: ', card_id);
        // TODO: Request (index, name & image) for the next card index + previous index 
        // Request all card info for the specific card
        const db_query = await db_1.default.query(`
        SELECT * \
        FROM cards \
        INNER JOIN sets ON cards.set_id = sets.set_id \
        INNER JOIN tcgs ON cards.tcg_id = tcgs.tcg_id \
        WHERE cards.card_id = $1 `, [card_id]);
        const query_result = db_query.rows[0];
        return res.status(200).json(query_result);
    }
    catch (e) {
        console.error('Database query error: ', e);
        res.status(500).json({ error: 'Database Request Error' });
    }
});
exports.default = router;
//# sourceMappingURL=card.js.map