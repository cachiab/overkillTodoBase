import { Component, OnInit, Inject, Renderer2  } from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  toggleNightMode = false;

  constructor(@Inject(DOCUMENT) private document: Document, private renderer : Renderer2) {}

  ngOnInit(): void {
    this.renderer.setAttribute(this.document.body, 'class', 'theme-light')
    this.toggleNightMode = !this.toggleNightMode;
  } 

  onDarkModeSwitched(isDarkModeChanged: boolean){
    this.toggleNightMode = !isDarkModeChanged;
    const hostClass = isDarkModeChanged ? 'theme-dark' : 'theme-light';
    this.renderer.setAttribute(this.document.body, 'class', hostClass);
  }
}
