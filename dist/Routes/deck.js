"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deck_1 = require("../Resolvers/deck");
const router = express_1.default.Router();
router.post('/create', (req, res) => {
    return (0, deck_1.createDeck)(req.body, res);
});
router.post('/open', (req, res) => {
    return (0, deck_1.openDeck)(req.body, res);
});
router.post('/draw', (req, res) => {
    return (0, deck_1.drawDeck)(req.body, res);
});
exports.default = router;
//# sourceMappingURL=deck.js.map