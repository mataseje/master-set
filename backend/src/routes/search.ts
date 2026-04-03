import pool from '../db';
import {Router, Request, Response} from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  /**
   * Pass the search query and perform a relative search within
   * the cards table.
   */
    const search_query = req.query.search;
    try {
      const db_query = await pool.query(`
        SELECT * \
        FROM cards \
        INNER JOIN sets ON cards.set_id = sets.set_id \
        WHERE card_name ILIKE $1`, [`%${search_query}%`]
      );

      return res.status(200).json(db_query.rows);
    } catch(e) {
      console.error('Database query error: ', e);
      res.status(500).json({error: 'Database Request Error'})
    }
});

export default router;