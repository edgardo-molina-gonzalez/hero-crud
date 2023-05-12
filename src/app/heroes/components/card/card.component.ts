import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input()
  public hero!: Hero;

  constructor() {}

  ngOnInit() {
    if (!this.hero) {
      throw new Error('El heroe no existe');
    }
  }
}
