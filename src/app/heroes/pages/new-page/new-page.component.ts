import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Hero, Publisher } from '../../interfaces/hero';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/ConfirmDialog/ConfirmDialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css'],
})
export class NewPageComponent implements OnInit {
  private heroService = inject(HeroesService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroService.getHeroById(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigateByUrl('/');

        this.heroForm.reset(hero);
        return;
      });
  }

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  get currentHero() {
    return this.heroForm.value as Hero;
  }

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }), //no pude ser nulo
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  onSubmit() {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroService.updateHero(this.currentHero).subscribe((hero) => {
        //TODO mostrar snakbar
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnakbar(`${hero.superhero} UPDATED!`);
      });
      return;
    } else {
      this.heroService.addHero(this.currentHero).subscribe((hero) => {
        //TODO mostrar snakbar y navegar a /heroes/edit/hero.id
        this.showSnakbar(`${hero.superhero} CREATE!`);
      });
    }
  }

  // matDialog
  onDeleteHero() {
    if (!this.currentHero.id) {
      throw new Error('Hero id is required');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.heroService.deleteHeroById(this.currentHero.id).subscribe(() => {
        this.router.navigate(['/heroes']);
      });
    });
  }

  showSnakbar(message: string) {
    this.snackbar.open(message, 'done', { duration: 2500 });
  }
}
