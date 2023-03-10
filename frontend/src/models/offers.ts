export interface Offer {
    _id: string,
    title: string,
    username?: string,
    description?: string,
    imgURL?: string,
    price: number,
    categogry?: string,
    totalrating:number,
    createdAt: string,
    updatedAt: string,
}