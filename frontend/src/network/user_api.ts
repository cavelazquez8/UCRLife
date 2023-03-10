import { User } from '../models/user';

async function fetchData(input: RequestInfo, init?: RequestInit) {
	const response = await fetch(input, init);
	if (response.ok) {
		return response;
	} else {
		const errorBody = await response.json();
		const errorMessage = errorBody.error;
		throw Error(errorMessage);
	}
}

export async function getLogIn(): Promise<User> {
	const response = await fetchData('/api/user', { method: 'GET' });
	return response.json();
}

export interface SignUpData {
	username: string;
	email: string;
	password: string;
}

export async function SignUpInfo(newUserInfo: SignUpData): Promise<User> {
	const response = await fetchData('/api/user/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newUserInfo),
	});
	return response.json();
}

export interface LoginInfo {
	email: string;
	password: string;
	verified: boolean;
	username: string;
}

export async function userLogin(logInUser: LoginInfo): Promise<User> {
	const response = await fetchData('/api/user/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(logInUser),
	});
	return response.json();
}

export async function logoutUser() {
	await fetchData('/api/user/logout', { method: 'POST' });
}
