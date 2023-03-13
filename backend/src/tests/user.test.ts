import {
	sum,
	sum1,
	getVerifiedUser2,
	login,
	getUser,
} from '../controllers/user';
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

	it('Sign Up Test', async () => {
		const users = db.collection('users');

		const mockUser = {
			_id: 'some-user-id1234',
			name: 'Joh2243',
			username: 'abc34',
			email: 'ab2c4@naver.com',
		};
		await users.insertOne(mockUser);

		const insertedUser = await users.findOne({ _id: 'some-user-id1234' });
		expect(insertedUser).toEqual(mockUser);
		await users.deleteOne({ _id: 'some-user-id1234' });
	});

	it('Get User Test', async () => {
		/*
		const request = httpMocks.createRequest({
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			hostname: 'localhost:3000',
			url: '/get',
			query: {
				userId: '640bb163f08d68b4e2f38c37',
			},
		});
		console.log(request);

		const response = httpMocks.createResponse();
		const next = jest.fn();
		await getUser(request, response, next);
		console.log(response);
		console.log(request);
		expect(response.statusCode).toBe(200);
		expect(next).not.toBeCalled();
        */

		const users = db.collection('users');
		const userId = new mongoose.Types.ObjectId('640bb163f08d68b4e2f38c37');
		// console.log('getting user');

		const user = await users.findOne({ _id: userId });
		// console.log(user);

		expect(user.username).toBe('ToanBao');
	});
});
