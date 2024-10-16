import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResult } from '../models/searchmodel';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http : HttpClient) { }
  getresults(keyword:string):Observable<SearchResult>{
    const url = `http://api.alquran.cloud/v1/search/${keyword}/all/en`;
    return this.http.get<any>(url).pipe(
      map(res => res.data)
    );
  }
}
