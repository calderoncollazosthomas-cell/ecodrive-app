import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService, GeoResult, WeatherResponse } from '../services/weather';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './weather.html',
  styleUrls: ['./weather.scss']
})
export class Weather {
  readonly weatherService = inject(WeatherService);
  private readonly cdr = inject(ChangeDetectorRef); // <-- Magia de Angular

  cityInput = '';
  loading = false;
  error = '';
  matches: GeoResult[] = [];
  selected: GeoResult | null = null;
  weather: WeatherResponse | null = null;

  onSearch(): void {
    const query = this.cityInput.trim();
    if (!query) return;

    this.error = '';
    this.loading = true;
    this.matches = [];
    this.selected = null;
    this.weather = null;
    this.cdr.detectChanges(); // <-- Forzamos actualización visual

    this.weatherService.searchCity(query).then(results => {
      this.loading = false;
      if (results.length === 0) {
        this.error = 'No se encontró esa ciudad. Intenta con otro nombre.';
      } else if (results.length === 1) {
        this.selectCity(results[0]);
      } else {
        this.matches = results;
      }
      this.cdr.detectChanges(); // <-- Forzamos actualización visual
    }).catch(() => {
      this.loading = false;
      this.error = 'Error de conexión buscando la ciudad.';
      this.cdr.detectChanges(); // <-- Forzamos actualización visual
    });
  }

  selectCity(city: GeoResult): void {
    this.selected = city;
    this.matches = [];
    this.loading = true;
    this.cdr.detectChanges();

    this.weatherService.getWeather(city.latitude, city.longitude).then(data => {
      this.weather = data;
      this.loading = false;
      this.cdr.detectChanges(); // <-- Forzamos actualización visual
    }).catch(() => {
      this.loading = false;
      this.error = 'Error obteniendo los datos del clima.';
      this.cdr.detectChanges();
    });
  }
}