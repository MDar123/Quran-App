import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchResult } from './models/searchmodel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from './Services/search.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private service : SearchService){}

  results : SearchResult | undefined;
  keyword = '';
  loading : boolean = false;
  error : string | undefined;
  search(keyword:string){
  this.results = undefined;
  this.error = undefined
  this.loading=true;
  this.service.getresults(keyword.toLowerCase()).subscribe( (res)=>{
  if(res){
    this.error = undefined;
    this.results = res;
    this.loading = false;
  }
  }, (error:HttpErrorResponse)=>{
      this.error = error.error.data;
      this.loading = false;
   } )
  }
}
