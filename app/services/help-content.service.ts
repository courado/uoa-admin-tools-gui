/**
 * Created by stefania on 7/13/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Page } from "../domain/page";
import {PageHelpContent} from "../domain/page-help-content";

@Injectable()
export class HelpContentService {

    constructor(private http:Http) {
    }

    private _helpContentUrl = process.env.API_ENDPOINT + ':' + process.env.API_PORT + process.env.API_PATH;

    static removeNulls(obj){
        var isArray = obj instanceof Array;
        for (var k in obj){
            if (obj[k]===null || obj[k]==='') isArray ? obj.splice(k,1) : delete obj[k];
            else if (typeof obj[k]=="object") HelpContentService.removeNulls(obj[k]);
        }
    }

    getPages() {
        return this.http.get(this._helpContentUrl + 'page')
            .map(res => <Array<Page>> res.json())
            .catch(this.handleError);
    }

    savePage(page: Page) {
        console.log("savePage",page);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        HelpContentService.removeNulls(page);

        return this.http.post(this._helpContentUrl + 'page', JSON.stringify(page), options)
            .map(res => <Page> res.json())
            .catch(this.handleError);
    }

    updatePage(page: Page) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        HelpContentService.removeNulls(page);

        return this.http.put(this._helpContentUrl + 'page', JSON.stringify(page), options)
            .map(res => <Page> res.json())
            .catch(this.handleError);
    }

    deletePages(ids : string[]) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this._helpContentUrl + 'page/delete',JSON.stringify(ids), options)
            .catch(this.handleError);
    }

    getPageHelpContents() {
        return this.http.get(this._helpContentUrl + 'pagehelpcontent')
            .map(res => <Array<PageHelpContent>> res.json())
            .catch(this.handleError);
    }

    getPageHelpContent(id : string) {
        return this.http.get(this._helpContentUrl + 'pagehelpcontent/' + id)
            .map(res => <PageHelpContent> res.json())
            .catch(this.handleError);
    }

    savePageHelpContent(pageHelpContent: PageHelpContent) {

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        HelpContentService.removeNulls(pageHelpContent);

        return this.http.post(this._helpContentUrl + 'pagehelpcontent', JSON.stringify(pageHelpContent), options)
            .map(res => <PageHelpContent> res.json())
            .catch(this.handleError);
    }

    updatePageHelpContent(pageHelpContent: PageHelpContent) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        HelpContentService.removeNulls(pageHelpContent);

        return this.http.put(this._helpContentUrl + 'pagehelpcontent', JSON.stringify(pageHelpContent), options)
            .map(res => <PageHelpContent> res.json())
            .catch(this.handleError);
    }

    deletePageHelpContents(ids : string[]) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this._helpContentUrl + 'pagehelpcontent/delete',JSON.stringify(ids), options)
            .catch(this.handleError);
    }

    togglePageHelpContents(ids : string[],status : boolean) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this._helpContentUrl + 'pagehelpcontent/toggle?status='+ status.toString(), JSON.stringify(ids), options)
            .map( res => <string[]> res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    
}