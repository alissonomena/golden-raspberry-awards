import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../../../../core/services/movie.service';
import { YearWinnerCount } from '../../../../core/models/movie.model';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-years-multiple-winners',
  imports: [MatTableModule, MatProgressSpinnerModule],
  templateUrl: './years-multiple-winners.html',
})
export class YearsMultipleWinners implements OnInit {
  private readonly movieService = inject(MovieService);

  data = signal<YearWinnerCount[]>([]);
  columns: string[] = ['year', 'winnerCount'];
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.movieService.getYearsWithMultipleWinners().subscribe({
      next: (res) => {
        this.data.set(res.years || []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
