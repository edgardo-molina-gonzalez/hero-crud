import { Component, OnInit, inject } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css'],
})
export class HeroPageComponent implements OnInit {
  private heroService = inject(HeroesService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public hero?: Hero;

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(1000),
        switchMap(({ id }) => this.heroService.getHeroById(id))
      )
      .subscribe((hero) => {
        if (!hero) return this.router.navigate(['/heroes.list']);

        this.hero = hero;
        console.log({ hero });
        return;
      });
  }

  goBack() {
    this.router.navigateByUrl('/heroes/list');
  }
}
