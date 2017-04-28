/**
 * Created by stefania on 4/26/17.
 */
export interface Topic {
    _id: string;
    name: string;
    description: string;
    date : Date;
    weight: number;
    questionOrder: string;
}

export interface CheckTopic {
    topic : Topic;
    checked : boolean;
}