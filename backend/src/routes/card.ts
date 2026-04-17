import pool from '../db';
import {Router, Request, Response} from 'express';

const router = Router();

router.get('/:card_id', async (req: Request, res: Response) => {
    try {
      const card_id = req.params.card_id;
      console.log('card_id: ', card_id)

      // TODO: Request (index, name & image) for the next card index + previous index 

      // Request all card info for the specific card
      const db_query = await pool.query(`
        SELECT * \
        FROM cards \
        INNER JOIN sets ON cards.set_id = sets.set_id \
        INNER JOIN tcgs ON cards.tcg_id = tcgs.tcg_id \
        WHERE cards.card_id = $1 `, [card_id]
      )

      const query_result = db_query.rows[0];
      return res.status(200).json(query_result);
    } catch(e) {
      console.error('Database query error: ', e);
      res.status(500).json({error: 'Database Request Error'})
    }
})

export default router;