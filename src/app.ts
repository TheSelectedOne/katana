import express from 'express';
import cors from 'cors';

import deckRouter from './Routes/deck';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(deckRouter);


export default app;
