import pool from '../db';
import {Router, Request, Response} from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
      const db_query = await pool.query('SELECT * FROM cards')
      return res.status(200).json(db_query.rows);
    } catch(e) {
      console.error('Database query error: ', e);
      res.status(500).json({error: 'Database Request Error'})
    }
})

export default router;