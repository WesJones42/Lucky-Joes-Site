import { Component } from '@angular/core';
import { SlideShow } from './slideshow';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [SlideShow]
})
export class Home {
  slide1 = [
    'B-Roll1.jpg',
    'B-Roll2.jpg',
    'B-Roll3.jpg'
  ];

  slide2 = [
    'B-Roll4.jpg',
    'B-Roll5.jpg',
    'B-Roll6.jpg'
  ];
}




