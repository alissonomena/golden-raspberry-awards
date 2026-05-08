import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../../../core/services/movie.service';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Studio } from '../../../../core/models/movie.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-top-studios',
  imports: [MatTableModule, MatProgressSpinnerModule],
  templateUrl: './top-studios.html',
})
export class TopStudios implements OnInit {
  private readonly movieService = inject(MovieService);

  data = signal<Studio[]>([]);
  columns: string[] = ['name', 'winCount'];
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.movieService
      .getStudiosWithWinCount()
      .pipe(map((res) => res.studios.sort((a, b) => b.winCount - a.winCount).slice(0, 3)))
      .subscribe({
        next: (res) => {
          this.data.set(res || []);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }
}
