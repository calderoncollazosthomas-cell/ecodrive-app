import { Component } from '@angular/core';
import { Weather } from '../../weather/weather'; // <-- 1. Importamos el clima (fíjate en los dos puntos y coma)

@Component({
  imports: [Weather], 
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {}