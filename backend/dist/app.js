"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// TODO: CREATE A ROUTE THAT REQUESTS ALL DATA FROM THE 'cards' Table
app.get('/', async (req, res) => {
    // const test_data = {
    //     test: 'value'
    // }
    try {
        const db_query = await db_1.default.query('SELECT * FROM cards');
        res.status(200).json(db_query.rows);
    }
    catch (e) {
        console.error('Database query error: ', e);
        res.status(500).json({ error: 'Database Request Error' });
    }
});
app.get('/test', (req, res) => {
    res.send('Hello World!');
});
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=app.js.map