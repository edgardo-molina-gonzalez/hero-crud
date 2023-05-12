import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent {
  private heroService = inject(HeroesService);

  public searchInput: FormControl = new FormControl();
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  searchHero() {
    const value = this.searchInput.value || '';
    this.heroService
      .getSuggestions(value)
      .subscribe((heroe) => (this.heroes = heroe));
  }

  onSelectedOption(event: any) {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.selectedHero = hero;
  }
}
