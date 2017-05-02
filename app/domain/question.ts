/**
 * Created by stefania on 4/26/17.
 */
import { Topic } from "./topic";

export interface Question {
    _id: string;
    question: string;
    answer: string;
    date : Date;
    isActive: boolean;
    weight: number;
    hitCount: number;
    topics: Topic[];
}

export interface CheckQuestion {
    question : Question;
    checked : boolean;
}