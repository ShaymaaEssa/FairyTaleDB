import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private httpClient:HttpClient){ }
  pageNum:string ="1";
  getData():Observable<any>{
    return this.httpClient.get(`https://api.themoviedb.org/3/discover/movie?api_key=48d62e7452a1f1a5e6018217ac27c50a&language=en-US&sort_by=vote_count.desc&page=${this.pageNum}&with_genres=16`)
  }

  setPageNumber(pageNum:string):void{
    this.pageNum = pageNum;
    console.log("PageNum"+this.pageNum);
  }
}
