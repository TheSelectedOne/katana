import express, { Request, Response } from 'express'
import { createDeck, drawDeck, openDeck } from '../Resolvers/deck'
const router = express.Router()

router.post('/create', async (req: Request, res: Response) => {
    return await createDeck(req.body, res)
})

router.post('/open', async (req: Request, res: Response) => {
    return await openDeck(req.body, res)
})

router.post('/draw', async (req: Request, res: Response) => {
    return await drawDeck(req.body, res)
})

export default router