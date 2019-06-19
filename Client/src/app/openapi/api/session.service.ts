/*
EasyShare - a module of CIRCABC
Copyright (C) 2019 European Commission

This file is part of the "EasyShare" project.

This code is publicly distributed under the terms of EUPL-V1.2 license,
available at root of the project or at https://joinup.ec.europa.eu/collection/eupl/eupl-text-11-12.
*/
/**
 * EasyShare
 * This is a API definition for the EasyShare service.
 *
 * OpenAPI spec version: 0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import {
    HttpClient, HttpHeaders, HttpParams,
    HttpResponse, HttpEvent
} from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { Credentials } from '../model/credentials';
import { Status } from '../model/status';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

    public logout() {
        localStorage.removeItem('ES_AUTH');
        localStorage.removeItem('ES_USERID');
        this.router.navigateByUrl('');
    }

    protected basePath = 'https://api.example.com';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    private storedId!: string;

    public getStoredCredentials(): Credentials | null {
        let credentialsStringified = localStorage.getItem('ES_AUTH');
        if (credentialsStringified) {
            return JSON.parse(credentialsStringified);
        }
        return null;
    }

    public getStoredId(): string | null {
        return localStorage.getItem('ES_USERID');
    }

    public setStoredCredentials(credentials: Credentials) {
        localStorage.setItem('ES_AUTH', JSON.stringify(credentials));
    }

    public setStoredId(id: string) {
        localStorage.setItem('ES_USERID', id);
    }
    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration, private router: Router) {

       if (configuration) {
            this.configuration = configuration;
            this.configuration.basePath = configuration.basePath || basePath || this.basePath;

        } else {
            this.configuration.basePath = basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * Used to login by internal users
     * @param credentials 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postLogin(credentials: Credentials, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public postLogin(credentials: Credentials, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public postLogin(credentials: Credentials, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public postLogin(credentials: Credentials, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
        if (credentials === null || credentials === undefined) {
            throw new Error('Required parameter credentials was null or undefined when calling postLogin.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'text/plain'
            //'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        return this.httpClient.post(`${this.configuration.basePath}/login`,
            credentials,
            {
                headers: headers,
                observe: observe,
                reportProgress: reportProgress,
                responseType: 'text'
            }
        );
    }

}
