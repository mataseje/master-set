import pool from '../db';
import {Router, Request, Response} from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  /**
   * Pass the search query and perform a relative search within
   * the cards table.
   */
    // Parse query parameters
    const search_string = req.query.search;
    const tcg = req.query.tcg;
    
    // Retrieve all cards, returning tcg and set info
    let base_query = `
      SELECT * \
      FROM cards \
      INNER JOIN sets ON cards.set_id = sets.set_id \
      INNER JOIN tcgs ON cards.tcg_id = tcgs.tcg_id \
      WHERE card_name ILIKE $1`
    const params = [`%${search_string}%`];

    // Apply additional filters (TCG type)
    if (tcg && typeof tcg == "string") {
      base_query += ` AND tcgs.tcg_id = $2`;
      params.push(tcg);
    }

    try {
      const db_query = await pool.query(base_query, params);
      return res.status(200).json(db_query.rows);
    } catch(e) {
      console.error('Database query error: ', e);
      res.status(500).json({error: 'Database Request Error'})
    }
});


router.get('/tcgs', async (req: Request, res: Response) => {
  /**
   * Pass the search query and perform a relative search within
   * the cards table.
   */
    // Retrieve all cards, returning tcg and set info
    let query = 'SELECT * FROM tcgs';

    try {
      const db_query = await pool.query(query);
      return res.status(200).json(db_query.rows);
    } catch(e) {
      console.error('Database query error: ', e);
      res.status(500).json({error: 'Database Request Error'})
    }
});

export default router;