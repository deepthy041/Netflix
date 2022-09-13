import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { movies } from './models/movies';
import { MovieServiceTsService } from './services/movie.service.ts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'NetflixPro';
  sticky=false;
  subs:Subscription[]=[];
  trending:any
  popular:movies|undefined;
  topRated:movies|undefined;
  originals:movies|undefined;
  nowPlaying:movies|undefined;

  sliderConfig={
    slidesToShow:7,
    slidesToScroll:2,
    arrows:true,
    autoplay:false
  };
  
  @ViewChild('stickHeader') header:ElementRef|undefined;
  headerBGUrl:string="";
  constructor(private movie:MovieServiceTsService){

  }
  ngOnInit(): void {
this.subs.push(this.movie.getTrending().subscribe({next:data=>{this.trending=data

this.headerBGUrl='http://image.tmdb.org/t/p/original'+this.trending.results[5].backdrop_path;
  }}));
this.subs.push(this.movie.getPopularMovies().subscribe({next:data=>this.popular=data}));
this.subs.push(this.movie.getTopRated().subscribe({next:data=>this.topRated=data}));
this.subs.push(this.movie.getOriginals().subscribe({next:data=>this.originals=data}));
this.subs.push(this.movie.getNowPlaying().subscribe({next:data=>this.nowPlaying=data}));
  }
  ngOnDestroy(): void {
    this.subs.map(s=>s.unsubscribe())
  }
  @HostListener('window:scroll',['$event'])
  handleScroll(){
    const windowScroll =window.pageYOffset;
    if(windowScroll >= this.header?.nativeElement.offsetHeight){
      this.sticky=true;
    }else{
      this.sticky=false;
    }
  }
  

}
