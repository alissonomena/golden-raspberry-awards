import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Navbar } from "./shared/components/navbar/navbar";
import { Header } from "./shared/components/header/header";
import { MatSidenavModule } from '@angular/material/sidenav';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, Navbar, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  readonly router = inject(Router);

  routeTitles: Record<string, string> = { '/dashboard': 'Dashboard', '/filmes': 'Filmes' };
  sidenavOpened = signal(true);
  pageTitle: string = '';
  
  constructor() {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      console.log("Current URL:", this.router.url);
      const url = this.router.url;
      this.pageTitle = this.routeTitles[url] ?? '';
    });
  }

  /**
   * Método que altera o estado de abertura do menu lateral
   */
  toggleSidenav() {
    this.sidenavOpened.update(opened => !opened);
  }
}
