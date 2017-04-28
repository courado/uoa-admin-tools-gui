/**
 * Created by stefania on 4/26/17.
 */
export interface Topic {
    _id: number;
    name: string;
    description: string;
    date : Date;
    weight: number;
    questionOrder: string;
}