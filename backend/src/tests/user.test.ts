import { sum, sum1 } from '../controllers/user';
import { MongoClient } from 'mongodb';
//import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import UserModel from '../models/user';

// 	expect(sum()).toBe(0);
// });

// test('basic again', () => {
// 	expect(sum(1, 2)).toBe(3);
// });

test('basic again2', () => {
	expect(sum1(4, 4)).toBe(8);
});

test('basic again3', () => {
	expect(sum1(4, 4)).toBe(8);
});

describe('User', () => {
	it('Test getverified function', () => {
		expect(sum1(4, 4)).toBe(8);
	});
});

// describe('Single MongoMemoryServer', () => {
// 	let con;
// 	let mongoServer;
// 	let url: string;
// 	let user_email: string;
// 	beforeAll(async () => {
// 		// mongoServer = await MongoMemoryServer.create();
// 		// url = mongoServer.getUri();
// 		// await mongoose.connect(url);

// 		const uri =
// 			'mongodb+srv://gruiz031:U0WUKyxlFU1M0hgD@cluster0.cacviy0.mongodb.net/ucr_list?retryWrites=true&w=majority';

// 		const client = new MongoClient(uri);
// 		client.connect((err) => {
// 			const collection = client.db('test').collection('devices');
// 			// perform actions on the collection object
// 			client.close();
// 		});
// 	});

// 	afterAll(async () => {
// 		if (con) {
// 			await con.close();
// 		}
// 		if (mongoServer) {
// 			await mongoServer.stop();
// 		}
// 	});
// 	it('Test getverified function', async (done) => {
// 		expect(sum1(4, 4)).toBe(8);
// 		const user = await UserModel.findById('640674ce6b8e996c9ad00626');
// 		user_email = user.email;
// 		expect(user_email).toBe('skang121@ucr.edu');
// 		done();
// 	});
// });

describe('insert', () => {
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

	it('should insert a doc into collection', async () => {
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
	});
});
