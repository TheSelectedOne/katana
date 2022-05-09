import express, {Request, Response} from 'express';

import {createDeck, drawDeck, openDeck} from '../Resolvers/deck';

const router = express.Router();

router.post('/create', (req: Request, res: Response) => {
	return createDeck(req.body, res);
});

router.post('/open', (req: Request, res: Response) => {
	return openDeck(req.body, res);
});

router.post('/draw', (req: Request, res: Response) => {
	return drawDeck(req.body, res);
});

export default router;
