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
    topics: Topic[] | string[];
}

export interface CheckQuestion {
    question : Question;
    checked : boolean;
}

export interface QuestionFilterOptions {
    id : string;
    active : boolean;
    text : string;
}