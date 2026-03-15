import express, {Express, Request, Response} from 'express';
import cors, { CorsOptions } from 'cors';
import pool from './db';


const app: Express = express();

app.use(cors())
app.use(express.json())

// TODO: CREATE A ROUTE THAT REQUESTS ALL DATA FROM THE 'cards' Table
app.get('/', async (req: Request, res: Response) => {
    // const test_data = {
    //     test: 'value'
    // }
    try {
      const db_query = await pool.query('SELECT * FROM cards')
      res.status(200).json(db_query.rows);

    } catch(e) {
      console.error('Database query error: ', e);
      res.status(500).json({error: 'Database Request Error'})
    }
})

app.get('/test', (req: Request, res: Response) => {
  res.send('Hello World!');
})

const port: number = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})