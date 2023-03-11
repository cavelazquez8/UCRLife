import {favoriteOffer} from '../models/favoriteOffer';
import {Offer} from '../models/offers';

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

export async function fetchFavoriteOffers(): Promise<favoriteOffer[]> {
	const response = await fetchData('/api/favorite', { method: 'GET' });
	return response.json();
}

export async function deleteFavorite(offerId: string) {
	await fetchData('/api/favorite/' + offerId, { method: 'DELETE' });
}

export async function fetchAddOffer(offerId:string): Promise<favoriteOffer> {
	console.log(offerId);
	const response = await fetchData('/api/favorite/addOffer/' + offerId, {method: 'POST'});
	return response.json();
}