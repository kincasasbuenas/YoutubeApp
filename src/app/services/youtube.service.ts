import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  apiKey = 'AIzaSyCIZjQ1nfYWkmlYgF5R4IGohNl9grfQVLQ';
  playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';
  constructor(public http: Http) {  }

  getVideos() {
    const uri = `${ this.youtubeUrl }/playlistItems`;
    const params = new URLSearchParams();
    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', this.playlist );
    params.set('key', this.apiKey );

    if (this.nextPageToken) {
      params.set('pageToken', this.nextPageToken);
    }

    return this.http.get( uri, {search: params } ).pipe( map( res => {
      console.log(res.json());
      this.nextPageToken = res.json().nextPageToken;

      let videos:any [] = [];
      for (let video of res.json().items) {
        let snippet = video.snippet;
        videos.push( snippet );
      }

      return videos;

    } ));
  }
}
