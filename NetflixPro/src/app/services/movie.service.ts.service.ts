import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { movies } from '../models/movies';

const enum endpoint{
  latest='/movie/latest',
  now_playing='/movie/now_playing',
  popular='/movie/popular',
  top_rated='/movie/top_rated',
  upcoming='/movie/upcoming',
  trending='/trending/all/week',
  originals='/discover/tv'
}
@Injectable({
  providedIn: 'root'
})

export class MovieServiceTsService {
 private URL='https://api.themoviedb.org/3'
 private api_key=environment.api;
  constructor(private http:HttpClient) { }

  getLatestMovie():Observable<movies>{
    return this.http.get<movies>(`${this.URL}${endpoint.latest}?api_key=${this.api_key}`)
  }
  getNowPlaying():Observable<movies>{
    return this.http.get<movies>(`${this.URL}${endpoint. now_playing}?api_key=${this.api_key}`)
  }
  getOriginals():Observable<movies>{
    return this.http.get<movies>(`${this.URL}${endpoint.originals}?api_key=${this.api_key}`)
  }
  getPopularMovies():Observable<movies>{
    return this.http.get<movies>(`${this.URL}${endpoint.popular}?api_key=${this.api_key}`)
  }
  getTopRated():Observable<movies>{
    return this.http.get<movies>(`${this.URL}${endpoint.top_rated}?api_key=${this.api_key}`)
  }
  getTrending():Observable<movies>{
    return this.http.get<movies>(`${this.URL}${endpoint.trending}?api_key=${this.api_key}`)
  }
}
