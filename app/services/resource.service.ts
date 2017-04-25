/**
 * Created by stefania on 5/26/16.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Resource } from './../domain/resource';
import { Observable } from 'rxjs/Rx';
import { ResourcePage } from './../domain/resource-page';


@Injectable()
export class ResourceService {

    constructor (private http: Http) {}

    // private _resourcesUrl = 'http://83.212.98.33:8080/RegistryService/resources/';
    private _resourcesUrl = 'http://83.212.101.85:8080/omtd-registry/resources/';

    getResources() {
        return this.http.get(this._resourcesUrl)
            .map(res => <ResourcePage> res.json())
            .catch(this.handleError);
    }

    getResource(resourceType: string, id: string) {
        return this.http.get(this._resourcesUrl + resourceType + "/" + id)
            .map(res => <Resource> res.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}