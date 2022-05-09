import request from 'supertest';

import {Deck} from '../Entities/Deck';
import app from '../app';
import {connection} from '../database';

const deckIdsForTesting: string[] = [];
beforeAll(async () => {
	await connection.initialize();
});

afterAll(async () => {
	for (let i = 0; i < deckIdsForTesting.length; i++) {
		await Deck.delete({
			deckId: deckIdsForTesting[i],
		});
	}
});

describe('deck test', () => {
	let deckId: string;
	test('should create deck', async () => {
		const body = {
			type: 'FULL',
			shuffled: true,
		};
		const response = await request(app).post('/create').send(body);
		expect(response.body).toHaveProperty('deckId');
		expect(response.body.type).toBe('FULL');
		expect(response.body.shuffled).toBe(true);
		expect(response.body.remaining).toBe(52);
		deckId = response.body.deckId;
		deckIdsForTesting.push(deckId);
	});
	test('should open deck', async () => {
		const body = {
			deckId,
		};
		const response = await request(app).post('/open').send(body);
		expect(response.body).toHaveProperty('deckId');
		expect(response.body.type).toBe('FULL');
		expect(response.body.shuffled).toBe(true);
		expect(response.body.remaining).toBe(52);
		expect(response.body).toHaveProperty('cards');
	});
	test('should draw from deck', async () => {
		const body = {
			deckId,
			count: 5,
		};
		const response = await request(app).post('/draw').send(body);
		expect(response.body.cards.length).toBe(5);
	});
});

