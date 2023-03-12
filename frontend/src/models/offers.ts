
export interface Offer {
    _id: string,
    userId: string,
    title: string,
    username?: string,
    description?: string,
    imgURL?: string,
    price: number,
    categogry?: string,
    totalrating:number,
    ratings:  {
        star: number;
        comment: string;
        postedby: string;
        postUsername: string,
      }[],
    createdAt: string,
    updatedAt: string,
}