import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserModel from '../models/user';
import Token from '../models/token';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import { ObjectId } from 'mongodb';

// import env from '../util/validateEnv';

// export const sendMail = async(email, subject, text)=> {
//     try{
//     transporter =nodemailer.createTransport({
//     host: env.HOST,
//     service: env.SERVICE,
//     mail_port: Number(env.EMAIL_PORT),
//     secure: Boolean(env.SECURE),
//     auth: {
//         user: env.USER,
//         pass: env.PASS
//     }
// })

export const sendAMail = async (
	email: string,
	subject: string,
	text: string
) => {
	try {
		//const hostName: string = process.env.HOST;
		const transporter = nodemailer.createTransport({
			//host: process.env.HOST,
			//service: process.env.SERVICE,
			//port: Number(process.env.EMAIL_PORT),
			//secure: Boolean(process.env.SECURE),
			service: 'gmail',
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: 'b3gsummer@gmail.com',
				pass: 'hmxxhrosjawmqpqp',
			},
		});

		await transporter.sendMail({
			from: 'b3gsummer@gmail.com',
			to: email,
			subject: subject,
			text: text,
		});
		console.log('email sent successfully');
	} catch (error) {
		console.log('email not sent!');
		console.log(error);
		return error;
	}
};

export const getVerifiedUser: RequestHandler = async (req, res, next) => {
	const verifiedUser = req.session.userID;

	try {
		const loggedUser = await UserModel.findById(verifiedUser)
			.select('+email')
			.exec();
		res.status(200).json(loggedUser);
	} catch (error) {
		next(error);
	}
};

interface userSignUp {
	username?: string;
	//firstName?: string,
	email?: string;
	password?: string;
}

export const getVerifiedUser2: RequestHandler = async (req, res, next) => {
	try {
		// const user = await UserModel.findOne({ _id: req.params.id });
		const user = await UserModel.findById(req.params.id);
		if (!user) return res.status(400).send({ message: 'Invalid link' });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: 'Invalid link' });
		user.verified = true;
		const verifiedUser2 = await user.save();
		await token.remove();
		console.log(verifiedUser2);

		res.status(200).send({ message: 'Email verified successfully' });
	} catch (error) {
		res.status(500).send({ message: 'Internal Server Error' });
	}
};

export const usersignup: RequestHandler<
	unknown,
	unknown,
	userSignUp,
	unknown
> = async (req, res, next) => {
	const username = req.body.username;
	//const firstName = req.body.firstName;
	//const objectId = new ObjectId(username);
	const email = req.body.email;
	const password = req.body.password;

	try {
		if (!username || !email || !password) {
			throw createHttpError(400, 'Please enter username, email, or password');
		}
		const existingUsername = await UserModel.findOne({
			username: username,
		}).exec();

		if (existingUsername) {
			throw createHttpError(
				409,
				'Username already taken. Please create a new one.'
			);
		}

		const existingEmail = await UserModel.findOne({ email: email }).exec();

		if (existingEmail) {
			throw createHttpError(
				409,
				'Email already used. Please use another email.'
			);
		}

		const hashPassword = await bcrypt.hash(password, 10);

		const newUser = await UserModel.create({
			username: username,
			email: email,
			password: hashPassword,
		});

		req.session.userID = newUser._id;
		const token = await new Token({
			userId: newUser._id,
			token: crypto.randomBytes(32).toString('hex'),
		}).save();
		const url = `${process.env.BASE_URL}api/user/${newUser._id}/verify/${token.token}`;
		console.log(url);
		//email!
		await sendAMail(email!, 'Verify Email', url);
		console.log(newUser);
		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
};

interface loginBody {
	email: string;
	password: string;
}

export const login: RequestHandler<
	unknown,
	unknown,
	loginBody,
	unknown
> = async (req, res, next) => {
	const emailEnterd = req.body.email;
	const passwordEntered = req.body.password;
	// const verified = req.body.verified;
	// console.log(verified);
	// console.log(req.body);

	try {
		if (!passwordEntered || !emailEnterd) {
			throw createHttpError(400, 'Missing email or password');
		}

		const validUser = await UserModel.findOne({ email: emailEnterd })
			.select('+password +email +verified')
			.exec();
		if (!validUser) {
			throw createHttpError(401, 'Invalid email or password');
		}
		if (!validUser.verified) {
			throw createHttpError(401, 'Unverified Email');
		}
		const samePassword = await bcrypt.compare(
			passwordEntered,
			validUser.password
		);
		if (!samePassword) {
			throw createHttpError(401, 'Invalid password');
		}

		req.session.userID = validUser._id;
		res.status(201).json(validUser);
	} catch (error) {
		next(error);
	}
};

export const logout: RequestHandler = (req, res, next) => {
	req.session.destroy((error) => {
		if (error) {
			next(error);
		} else {
			res.sendStatus(200);
		}
	});
};
