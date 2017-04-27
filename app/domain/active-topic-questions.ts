/**
 * Created by stefania on 4/26/17.
 */
import { Topic } from "./topic";
import { Question } from "./question";

export interface ActiveTopicQuestions {
    topic: Topic;
    questionList: Question[];
}