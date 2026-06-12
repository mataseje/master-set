import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import account from './routes/account'
import auth from './routes/auth'
import browse from './routes/browse'
import card from './routes/card'
import search from './routes/search'

// Adds env variables to process.env
dotenv.config();

const app: Express = express();

app.use(cors())
app.use(express.json())

app.use('/account', account);
app.use('/auth', auth);
app.use('/browse', browse);
app.use('/card', card);
app.use('/search', search);

const port: number = Number(process.env.EXPRESS_PORT ?? 3000);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})