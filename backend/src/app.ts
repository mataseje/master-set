import express, {Express, Request, Response} from 'express';
import cors, { CorsOptions } from 'cors';
import browse from './routes/browse'
import card from './routes/card'


const app: Express = express();

app.use(cors())
app.use(express.json())

app.use('/browse', browse);
app.use('/card', card);

const port: number = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})