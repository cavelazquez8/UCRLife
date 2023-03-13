import { getOffer, createOffer } from '../controllers/offers';
import { MongoClient } from 'mongodb';
//import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import UserModel from '../models/user';
import httpMocks from 'node-mocks-http';

describe('User Test', () => {
	let connection;
	let db;
	const uri =
		'mongodb+srv://gruiz031:U0WUKyxlFU1M0hgD@cluster0.cacviy0.mongodb.net/ucr_list?retryWrites=true&w=majority';

	beforeAll(async () => {
		connection = await MongoClient.connect(uri);
		db = await connection.db('ucr_list');
	});

	afterAll(async () => {
		await connection.close();
	});

	it('Get Offer Test', async () => {
		const request = httpMocks.createRequest({
			session: {
				userId: 'gruiz031@ucr.edu',
			},
		});
		const response = httpMocks.createResponse();
		const next = jest.fn();
		await getOffer(request, response, next);
		//console.log(response);
		expect(response.statusCode).toBe(200);
	});

	it('Create Offer Test', async () => {
		const request = httpMocks.createRequest({
			method: 'POST',
			url: '/offers',
			body: {
				title: 'Create Mock Offer',
				username: 'Mock User',
				description: 'Mock Offer Description',
				imgURL: '',
				price: '55',
				category: '',
			},
			session: {
				userId: 'skang121@ucr.edu',
			},
		});
		console.log(request);

		const response = httpMocks.createResponse();
		const next = jest.fn();
		await createOffer(request, response, next);
		// console.log(response);
		// console.log(request);
		expect(response.statusCode).toBe(200);
	});
});
