import { Response } from 'express'
import { nanoid } from 'nanoid'
import { Deck } from '../Entities/Deck'
import FullDeck from '../Decks/FullDeck.json'
import ShortDeck from '../Decks/ShortDeck.json'

interface CreateDeck {
    type: "FULL" | "SHORT"
    shuffled: boolean
}

interface OpenDeck {
    deckId: string
}

interface DrawDeck {
    deckId: string
    count: number
}

export interface Card {
    value: string
    suit: string
    code: string
}

export const createDeck = async(data: CreateDeck, res: Response) => {

    if (!data.type || (data.type !== "FULL" && data.type !== "SHORT")) return res.send({
        error: true,
        message: "please specify if the deck should be FULL or SHORT"
    }).status(400).end()

    if (!data.shuffled) return res.send({
        error: true,
        message: "please specify if the deck should be shuffled"
    }).status(400).end()

    let cards: Card[] = []
    data.type === "FULL" && (cards = FullDeck)
    data.type === "SHORT" && (cards = ShortDeck)
    data.shuffled && (cards = shuffleCards(cards))
    const id = nanoid()
    const deck = Deck.create({
        deckId: id,
        type: data.type,
        shuffled: data.shuffled,
        remaining: cards.length,
        cards: cards,
    })

    await deck.save().catch(err => {
        res.send({
            error: true,
            message: err
        }).status(500).end()
    })

    const response = {
        deckId: deck.deckId,
        type: deck.type,
        shuffled: deck.shuffled,
        remaining: deck.remaining
    }

    return res.send(response).end()
}

export const openDeck = async (data: OpenDeck, res: Response) => {

    if (!data.deckId) return res.send({
        error: true,
        message: "missing deck id"
    }).status(400).end()

    const deck = await Deck.findOne({
        where: {
            deckId: data.deckId,
        },
    });

    return deck ? res.send(deck).end() : res.send({
        error: true,
        message: 'Missing deck'
    }).status(404).end()
}

export const drawDeck = async (data: DrawDeck, res: Response) => {

    if (!data.deckId) return res.send({
        error: true,
        message: "missing deck id"
    }).status(400).end()

    if (!data.count) return res.send({
        error: true,
        message: "missing card count"
    }).status(400).end()

    const deck = await Deck.findOne({
        where: {
            deckId: data.deckId
        },
        select: ['cards', 'remaining', 'deckId']
    }).catch(err => {
        res.send({
            error: true,
            message: err
        })
    })

    if (!deck) return res.send({
        error: true,
        message: 'Missing deck'
    }).status(404).end()

    let cards = deck.cards
    const selectedCards = []
    let remanining = deck.remaining

    if (deck.remaining < data.count) return res.send({
        error: true,
        message: "not enough cards",
        remaining: cards.length
    })

    for (let i = 0; i < data.count; i++) {
        selectedCards.push(cards[i])
        cards.shift()
        remanining--

    }
    deck.cards = cards
    deck.remaining = remanining

    await deck.save().catch(err => {
        return res.send({
            error: true,
            message: err
        }).status(500).end()
    })

    return res.send({cards: selectedCards})
}

const shuffleCards = (cards: Card[]) => {
    // Fisher-Yates Shuffle https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    let currentIndex = cards.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]]
    }
    return cards
}