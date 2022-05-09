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
const supertest_1 = __importDefault(require("supertest"));
const Deck_1 = require("../Entities/Deck");
const app_1 = __importDefault(require("../app"));
const database_1 = require("../database");
const deckIdsForTesting = [];
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.connection.initialize();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < deckIdsForTesting.length; i++) {
        yield Deck_1.Deck.delete({
            deckId: deckIdsForTesting[i],
        });
    }
}));
describe('deck test', () => {
    let deckId;
    test('should create deck', () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            type: 'FULL',
            shuffled: true,
        };
        const response = yield (0, supertest_1.default)(app_1.default).post('/create').send(body);
        expect(response.body).toHaveProperty('deckId');
        expect(response.body.type).toBe('FULL');
        expect(response.body.shuffled).toBe(true);
        expect(response.body.remaining).toBe(52);
        deckId = response.body.deckId;
        deckIdsForTesting.push(deckId);
    }));
    test('should open deck', () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            deckId,
        };
        const response = yield (0, supertest_1.default)(app_1.default).post('/open').send(body);
        expect(response.body).toHaveProperty('deckId');
        expect(response.body.type).toBe('FULL');
        expect(response.body.shuffled).toBe(true);
        expect(response.body.remaining).toBe(52);
        expect(response.body).toHaveProperty('cards');
    }));
    test('should draw from deck', () => __awaiter(void 0, void 0, void 0, function* () {
        const body = {
            deckId,
            count: 5,
        };
        const response = yield (0, supertest_1.default)(app_1.default).post('/draw').send(body);
        expect(response.body.cards.length).toBe(5);
    }));
});
//# sourceMappingURL=deck.test.js.map