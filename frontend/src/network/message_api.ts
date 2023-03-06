import {Message} from '../models/message';

async function fetchData(input: RequestInfo, init?: RequestInit) {
	console.log(input);
	console.log(init);
	const response = await fetch(input, init);
	if (response.ok) {
		return response;
	} else {
		const errorBody = await response.json();
		const errorMessage = errorBody.error;
		throw Error(errorMessage);
	}
}

export async function fetchUserInteractions(): Promise<Message[]> {
    const response = await fetchData('/api/message/', { method: 'GET' });
	return response.json();
}

export async function fetchUserSpecificMessages(): Promise<Message[]> {
    const response = await fetchData('/api/message/messages', { method: 'GET' });
	return response.json();
}

export async function sendMessage(message: Message): Promise<Message> {
	const response = await fetchData('/api/message/send', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	});
	return response.json();
}