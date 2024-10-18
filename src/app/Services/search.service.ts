import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResult } from '../models/searchmodel';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http : HttpClient) { }
  getresults(keyword:string):Observable<SearchResult>{
      const params = new HttpParams().set('query', keyword);
      const url = `http://api.alquran.cloud/v1/search/${keyword}/all/en`;

      return this.http.get<any>(url, { params }).pipe(
        map(res => {
          const data = res.data;
          localStorage.setItem(`search-${keyword}`, JSON.stringify(data));
          return data;
        })
      );
    }
  }
