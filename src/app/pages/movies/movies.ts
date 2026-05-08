import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MovieService } from '../../core/services/movie.service';
import { Movie, MovieParams } from '../../core/models/movie.model';

@Component({
  selector: 'app-movies',
  imports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class Movies implements OnInit {
  private readonly movieService = inject(MovieService);

  data = signal<Movie[]>([]);
  columns: string[] = ['id', 'year', 'title', 'winner'];
  loading = signal(false);
  filterYear: string = '';
  filterWinner: string = '';
  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  ngOnInit(): void {
    this.loadMovies();
  }

  /**
   * Método para carregar os filmes com base nos filtros e paginação atuais.
   */
  loadMovies(): void {
    this.loading.set(true);

    const params: MovieParams = {
      page: this.pageIndex,
      size: this.pageSize,
      year: this.filterYear ? parseInt(this.filterYear) : undefined,
      winner: this.filterWinner !== '' ? this.filterWinner === 'true' : undefined,
    };

    this.movieService.getMovies(params).subscribe({
      next: (res) => {
        this.data.set(res.content || []);
        this.totalElements = res.totalElements;
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  /**
   * Método para lidar com mudanças nos filtros e recarregar os filmes.
   */
  onFilterChange(): void {
    this.pageIndex = 0;
    this.loadMovies();
  }

  /**
   * Método para lidar com mudanças na paginação e recarregar os filmes.
   */
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadMovies();
  }
}
