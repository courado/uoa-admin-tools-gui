/**
 * Created by stefania on 4/26/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Topic } from './../domain/topic';
import { Question } from './../domain/question';
import { ActiveTopicQuestions } from './../domain/active-topic-questions';

@Injectable()
export class FAQService {

    constructor (private http: Http) {}

    private _faqsUrl = process.env.API_ENDPOINT + ':' + process.env.API_PORT + process.env.API_PATH;

    getTopics() {
        return this.http.get(this._faqsUrl + 'topic')
                .map(res => <Array<Topic>> res.json())
                .catch(this.handleError);
    }

    // getResources() {
    //     return this.http.get(this._resourcesUrl)
    //         .map(res => <ResourcePage> res.json())
    //         .catch(this.handleError);
    // }
    //
    // getResource(resourceType: string, id: string) {
    //     return this.http.get(this._resourcesUrl + resourceType + "/" + id)
    //         .map(res => <Resource> res.json())
    //         .catch(this.handleError);
    // }

    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}