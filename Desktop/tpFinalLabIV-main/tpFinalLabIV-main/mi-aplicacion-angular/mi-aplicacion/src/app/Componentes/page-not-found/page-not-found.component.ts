import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Howl } from 'howler';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  private sound : Howl;

  constructor(private route: ActivatedRoute) { 
    this.sound = new Howl({
      src : "assets/pageNotFound/pageNotFoundSound.mp3"
    })
  }

  imagePath : string = "assets/pageNotFound/enojado.gif";
  imagePathMouseOver : string = "assets/pageNotFound/trippieReddApuntando.gif";

  ngOnInit(): void {
    this.sound.play();
  }

  changeImage(){
    this.imagePath = this.imagePathMouseOver;

    let h3 = document.querySelector("h3") as HTMLElement;
    h3.innerHTML = "ARRIBA LAS MANOS HACKER!!!";

    this.sound.play();
  }

  resetImage(){
    this.imagePath = "assets/pageNotFound/enojado.gif";

    let h3 = document.querySelector("h3") as HTMLElement;
    h3.innerHTML = "";

    this.sound.stop();
  }
}
