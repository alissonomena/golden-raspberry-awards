import { Component, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MovieService } from '../../../../core/services/movie.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Movie } from '../../../../core/models/movie.model';

@Component({
  selector: 'app-winners-by-year',
  imports: [FormsModule, MatTableModule, MatProgressSpinnerModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './winners-by-year.html',
})
export class WinnersByYear implements OnInit {
  private readonly movieService = inject(MovieService);

  data = signal<Movie[]>([]);
  columns = ['id', 'year', 'title'];
  searchYear = '';
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.search();
  }

  /**
   * Método para buscar os vencedores de um ano específico.
   */
  search(year: number = 2026): void {
    if(this.searchYear)
      year = parseInt(this.searchYear);
    
    if(!year) return;
    
    this.loading.set(true);
    this.movieService.getWinnersByYear(year).subscribe({
      next: (res) => {
        this.data.set(res || []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
