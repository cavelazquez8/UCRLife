import { Offer } from '../models/offers';

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

export async function fetchUserOffers(): Promise<Offer[]> {
	const response = await fetchData('/api/offers', { method: 'GET' });
	return response.json();
}

export async function fetchAllOffers(): Promise<Offer[]> {
	const response = await fetchData('/api/offers/all', { method: 'GET' });
	return response.json();
}

export interface OfferInput {
	title: string;
	username?: string;
	description?: string;
	imgURL?: string;
	price: number;
	category?: string;
}

export async function createOffer(offer: OfferInput): Promise<Offer> {
	const response = await fetchData('/api/offers', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(offer),
	});
	return response.json();
}

export async function updateOffer(
	offerId: string,
	offer: OfferInput
): Promise<Offer> {
	const response = await fetchData('/api/offers/' + offerId, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(offer),
	});
	return response.json();
}

export async function searchOffer(keyword: string): Promise<Offer[]> {
	const response = await fetchData('/api/offers/search?keyword=' + keyword, {
		method: 'GET',
	});
	console.log(response);

	return response.json();
}

export async function deleteOffer(offerId: string) {
	await fetchData('/api/offers/' + offerId, { method: 'DELETE' });
}
export async function getOffer(offerId:string): Promise<Offer>{
	const response = await fetchData('/api/offers/'+offerId, {method:'GET'});
	return response.json();
}

export async function rateOffer(
	offerId: string,
	star: number,
	comment: string,
	postUsername: string,
): Promise<void> {
	await fetchData(`/api/offers/rating`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',

		},
		body: JSON.stringify({ star, comment, offerId, postUsername }),
	});
}