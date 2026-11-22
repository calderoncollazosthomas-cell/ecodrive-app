import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// 1. Importamos el Header y el Footer (sin la palabra Component)
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true, // Importante que esté en true
  // 2. Los agregamos al arreglo de imports
  imports: [
    RouterOutlet, 
    Header, 
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ecodrive-app');
}