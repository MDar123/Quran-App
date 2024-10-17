import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
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
export class AppComponent implements OnInit{
  constructor(private service : SearchService, private route: ActivatedRoute,private router : Router){}
  ngOnInit(): void {
    this.route.queryParams.subscribe( (params)=>{
      if(params['query']){
        this.keyword = params['query'];
        this.service.getresults(this.keyword).subscribe( (data)=>{
          this.results = data;
          console.log(data);
        } )
      }

    } )
  }
  results : SearchResult | undefined;
  keyword = '';
  loading : boolean = false;
  error : string | undefined;
  search(){
  this.results = undefined;
  this.error = undefined
  this.loading=true;
  this.router.navigate([], {
    queryParams: { query: this.keyword },
    queryParamsHandling: 'merge'
  });
    this.service.getresults(this.keyword.toLowerCase()).subscribe( (res)=>{
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
