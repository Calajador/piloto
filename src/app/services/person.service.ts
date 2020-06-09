import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from '../model/Person';
import { Constants } from '../common/Constants';
import { Identification } from '../model/Identification';
const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json' })};
@Injectable({
  providedIn: 'root'
})

export class PersonService {

  constructor(private http:HttpClient) { }

  createPerson(person:Person){
    return this.http.post<any>(Constants.UrlApis.POST_CREATE_PERSON,person,httpOptions);
  }

  searchPerson(id:Identification){
    return this.http.post<any>(Constants.UrlApis.POST_SEARCH_PERSON,id,httpOptions);
  }
}
