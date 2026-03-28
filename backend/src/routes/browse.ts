import pool from '../db';
import {Router, Request, Response} from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
      const db_query = await pool.query(`
        SELECT * \
        FROM sets`
      );

      return res.status(200).json(db_query.rows);
    } catch(e) {
      console.error('Database query error: ', e);
      res.status(500).json({error: 'Database Request Error'})
    }
});

router.get('/set/:id', async (req: Request, res: Response) => {
    try {
      const set_id = req.params.id;
      console.log('set_id: ', set_id);
      console.log('typeof set_id: ', typeof set_id);
      if (typeof set_id !== "string") {
        return res.status(400).send("Invalid ID");
      }

      const set_id_int = parseInt(set_id, 10)
      console.log('set_id_int', set_id_int);
      if (isNaN(set_id_int)){
        return res.status(400).send("Invalid ID");
      };

      const db_query = await pool.query('SELECT * \
                                         FROM cards \
                                         WHERE set_id = $1', [set_id_int])
      return res.status(200).json(db_query.rows[0]);
    } catch(e) {
      console.error('Database query error: ', e);
      res.status(500).json({error: 'Database Request Error'})
    }
});

export default router;