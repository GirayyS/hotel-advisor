import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs"; 
import { GetCardResponseModel } from '../models/GetCardResponseModel';
import { GetExtraModel } from "../models/GetCardDetails";

@Injectable({
    providedIn: 'root'
})

export class ApiserviceService{
    baseURL: string=""

    constructor(private http: HttpClient){}
    
    findCard(json:any): Observable<[[GetCardResponseModel]]>{
        return this.http.post<[[GetCardResponseModel]]>(this.baseURL,json);
    }

    
    findCardDetails(json:any): Observable<[[GetExtraModel]]>{
        return this.http.post<[[GetExtraModel]]>(this.baseURL,json);
    }

}