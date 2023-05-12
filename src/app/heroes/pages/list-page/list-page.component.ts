import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent implements OnInit {
  constructor(private heroService: HeroesService) {}

  public heroes: Hero[] = [];

  ngOnInit() {
    this.heroService.getHeroes().subscribe((hero) => (this.heroes = hero));
  }
}
