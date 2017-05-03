/**
 * Created by stefania on 4/26/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Topic } from './../domain/topic';
import { Question } from './../domain/question';
import { ActiveTopicQuestions } from './../domain/active-topic-questions';

@Injectable()
export class FAQService {

    constructor (private http: Http) {}

    private _faqsUrl = process.env.API_ENDPOINT + ':' + process.env.API_PORT + process.env.API_PATH;

    static removeNulls(obj){
        var isArray = obj instanceof Array;
        for (var k in obj){
            if (obj[k]===null || obj[k]==='') isArray ? obj.splice(k,1) : delete obj[k];
            else if (typeof obj[k]=="object") FAQService.removeNulls(obj[k]);
        }
    }

    getTopics() {
        return this.http.get(this._faqsUrl + 'topic')
                .map(res => <Array<Topic>> res.json())
                .catch(this.handleError);
    }

    saveTopic(topic: Topic) {

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        FAQService.removeNulls(topic);

        return this.http.post(this._faqsUrl + 'topic', JSON.stringify(topic), options)
            .map(res => <Topic> res.json())
            .catch(this.handleError);
    }

    updateTopic(topic: Topic) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        FAQService.removeNulls(topic);

        return this.http.put(this._faqsUrl + 'topic', JSON.stringify(topic), options)
            .map(res => <Topic> res.json())
            .catch(this.handleError);
    }

    deleteTopics(ids : string[]) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this._faqsUrl + 'topic/delete',JSON.stringify(ids), options)
            .catch(this.handleError);
    }

    orderTopic(ids: string[], order: string) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this._faqsUrl + 'topic/toggle?order='+ order, JSON.stringify(ids), options)
            .map( res => <string[]> res.json())
            .catch(this.handleError);
    }

    getQuestions() {
        return this.http.get(this._faqsUrl + 'question')
            .map(res => <Array<Question>> res.json())
            .catch(this.handleError);
    }

    saveQuestion(question: Question) {

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        FAQService.removeNulls(question);

        return this.http.post(this._faqsUrl + 'question', JSON.stringify(question), options)
            .map(res => <Question> res.json())
            .catch(this.handleError);
    }

    toggleQuestion(ids : string[],status : boolean) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this._faqsUrl + 'question/toggle?status='+ status.toString(), JSON.stringify(ids), options)
            .map( res => <string[]> res.json())
            .catch(this.handleError);
    }

    deleteQuestion(id : string) {
        return this.http.delete(this._faqsUrl + 'question/' + id)
            .catch(this.handleError);
    }

    deleteQuestions(ids : string[]) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this._faqsUrl + 'question/delete',JSON.stringify(ids), options)
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