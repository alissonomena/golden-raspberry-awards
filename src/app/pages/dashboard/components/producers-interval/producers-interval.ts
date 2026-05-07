import { Component, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MovieService } from '../../../../core/services/movie.service';
import { ProducerInterval } from '../../../../core/models/movie.model';

@Component({
  selector: 'app-producers-interval',
  imports: [MatTableModule, MatProgressSpinnerModule],
  templateUrl: './producers-interval.html',
})
export class ProducersInterval implements OnInit {
  private readonly movieService = inject(MovieService);

  columns = ['producer', 'interval', 'previousWin', 'followingWin'];
  min = signal<ProducerInterval[]>([]);
  max = signal<ProducerInterval[]>([]);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.movieService.getProducersInterval().subscribe({
      next: (res) => {
        this.min.set(res.min || []);
        this.max.set(res.max || []);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
