
import {User as UserModel} from '../models/user';

export interface Offer {
    _id: string,
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
        postedby: UserModel;
      }[],
    createdAt: string,
    updatedAt: string,
}