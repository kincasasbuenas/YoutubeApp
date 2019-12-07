import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

 declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: any [] = [];
  videoSel: any;

  constructor(public yt: YoutubeService) {
    this.yt.getVideos().subscribe(
      videos => {
        this.videos = videos;
      }
    );
   }

  ngOnInit() {
  }

  verVideo( video: any ) {
    this.videoSel = video;
    $('#exampleModal').modal();
  }

  cerrarModal() {
    this.videoSel = null;
    $('#exampleModal').modal('hide');
  }

  masVideos() {
    this.yt.getVideos().subscribe(
      videos =>   this.videos.push.apply(this.videos, videos)
    );
  }

}
