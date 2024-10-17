import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private route : ActivatedRoute) { }
  getQueryParams():Observable<any>{
  return this.route.params;
  }
}
