import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-show',
  standalone: true,
  templateUrl: './slideshow.html',
  styleUrls: ['./slideshow.css']
})
export class SlideShow implements OnInit {
  @Input() images: string[] = [];

  currentImage: string = '';
  currentIndex: number = 0;
  fade: boolean = true;

  ngOnInit(): void {
    if (this.images.length > 0) {
      this.currentImage = this.images[0];

      setInterval(() => {
        this.fade = false;
        setTimeout(() => {
          this.currentIndex = (this.currentIndex + 1) % this.images.length;
          this.currentImage = this.images[this.currentIndex];
          this.fade = true;
        }, 500);
      }, 8000);
    }
  }
}