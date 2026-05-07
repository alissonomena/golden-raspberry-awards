import { Component } from '@angular/core';
import { YearsMultipleWinners } from './components/years-multiple-winners/years-multiple-winners';
import { TopStudios } from './components/top-studios/top-studios';
import { ProducersInterval } from './components/producers-interval/producers-interval';
import { WinnersByYear } from './components/winners-by-year/winners-by-year';

@Component({
  selector: 'app-dashboard',
  imports: [YearsMultipleWinners, TopStudios, ProducersInterval, WinnersByYear],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
