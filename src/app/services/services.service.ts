import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewsResponse, Article, ArticlesByCategoryAndPage } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = {};
  constructor(private http: HttpClient) { }


  getTopHeadLineByCategory(category: string, dateI?, dateF?, last?): Observable<Article[]> {
    const headers = new HttpHeaders()

      .set('X-Api-Key', 'd88b0d481a7a4c08bbb083b87c06a46c')
      .set('Authorization', 'd88b0d481a7a4c08bbb083b87c06a46c');
    if (last) {
      var dt = new Date();
      return this.http.get<NewsResponse>(`https://newsapi.org/v2/everything?language=es&q=${category}&from=${dt.toISOString()}&to=${dt.toISOString()}&sortBy=publishedAt`, { 'headers': headers, params: { apiKey } }).pipe(
        map(({ articles }) => articles)
      );
    }
    else if (dateI != undefined && dateF != undefined) {
      console.log(`country=mx&category=${category}&from=${dateI}&to=${dateF}`)

      return this.http.get<NewsResponse>(`https://newsapi.org/v2/everything?language=es&q=${category}&from=${dateI}&to=${dateF}&sortBy=publishedAt`, { 'headers': headers, params: { apiKey } }).pipe(
        map(({ articles }) => articles)
      );
    } else {
      return this.http.get<NewsResponse>(`https://newsapi.org/v2/everything?language=es&q=${category}&sortBy=publishedAt`, { 'headers': headers, params: { apiKey } }).pipe(
        map(({ articles }) => articles)
      );

    }



  }
}