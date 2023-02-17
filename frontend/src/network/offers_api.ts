import {Offer} from "../models/offers";

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

export async function fetchOffers(): Promise<Offer[]> {
    const response = await fetchData("/api/offers", { method: "GET" });
    return response.json();
}

export interface OfferInput {
    title: string,
    description?: string,
    price: number,
}

export async function createOffer(note: OfferInput): Promise<Offer> {
    const response = await fetchData("/api/offers",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });
    return response.json();
}