"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawDeck = exports.openDeck = exports.createDeck = void 0;
const nanoid_1 = require("nanoid");
const Deck_1 = require("../Entities/Deck");
const FullDeck_json_1 = __importDefault(require("../Decks/FullDeck.json"));
const ShortDeck_json_1 = __importDefault(require("../Decks/ShortDeck.json"));
const createDeck = (data, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.type || (data.type !== 'FULL' && data.type !== 'SHORT')) {
        return res.send({
            error: true,
            message: 'please specify if the deck should be FULL or SHORT',
        }).status(400).end();
    }
    if (!data.shuffled) {
        return res.send({
            error: true,
            message: 'please specify if the deck should be shuffled',
        }).status(400).end();
    }
    let cards = [];
    data.type === 'FULL' && (cards = FullDeck_json_1.default);
    data.type === 'SHORT' && (cards = ShortDeck_json_1.default);
    data.shuffled && (cards = shuffleCards(cards));
    const id = (0, nanoid_1.nanoid)();
    const deck = Deck_1.Deck.create({
        deckId: id,
        type: data.type,
        shuffled: data.shuffled,
        remaining: cards.length,
        cards,
    });
    yield deck.save().catch((err) => {
        res.send({
            error: true,
            message: err,
        }).status(500).end();
    });
    const response = {
        deckId: deck.deckId,
        type: deck.type,
        shuffled: deck.shuffled,
        remaining: deck.remaining,
    };
    return res.send(response).end();
});
exports.createDeck = createDeck;
const openDeck = (data, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.deckId) {
        return res.send({
            error: true,
            message: 'missing deck id',
        }).status(400).end();
    }
    const deck = yield Deck_1.Deck.findOne({
        where: {
            deckId: data.deckId,
        },
    });
    return deck ? res.send(deck).end() : res.send({
        error: true,
        message: 'Missing deck',
    }).status(404).end();
});
exports.openDeck = openDeck;
const drawDeck = (data, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.deckId) {
        return res.send({
            error: true,
            message: 'missing deck id',
        }).status(400).end();
    }
    if (!data.count) {
        return res.send({
            error: true,
            message: 'missing card count',
        }).status(400).end();
    }
    const deck = yield Deck_1.Deck.findOne({
        where: {
            deckId: data.deckId,
        },
        select: ['cards', 'remaining', 'deckId'],
    }).catch((err) => {
        res.send({
            error: true,
            message: err,
        });
    });
    if (!deck) {
        return res.send({
            error: true,
            message: 'Missing deck',
        }).status(404).end();
    }
    const cards = deck.cards;
    const selectedCards = [];
    let remanining = deck.remaining;
    if (deck.remaining < data.count) {
        return res.send({
            error: true,
            message: 'not enough cards',
            remaining: cards.length,
        });
    }
    for (let i = 0; i < data.count; i++) {
        selectedCards.push(cards[i]);
        cards.shift();
        remanining--;
    }
    deck.cards = cards;
    deck.remaining = remanining;
    yield deck.save().catch((err) => {
        return res.send({
            error: true,
            message: err,
        }).status(500).end();
    });
    return res.send({ cards: selectedCards });
});
exports.drawDeck = drawDeck;
const shuffleCards = (cards) => {
    let currentIndex = cards.length;
    let randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [cards[currentIndex], cards[randomIndex]] = [cards[randomIndex], cards[currentIndex]];
    }
    return cards;
};
//# sourceMappingURL=deck.js.map