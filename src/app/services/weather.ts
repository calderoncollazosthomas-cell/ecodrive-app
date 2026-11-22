import { Injectable } from '@angular/core';

export interface GeoResult {
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export interface WeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}

@Injectable({ providedIn: 'root' })
export class WeatherService {

  async searchCity(name: string): Promise<GeoResult[]> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=5&language=es&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results ?? [];
  }

  async getWeather(lat: number, lon: number): Promise<WeatherResponse> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`;
    const response = await fetch(url);
    return await response.json();
  }

  weatherLabel(code: number): string {
    const map: Record<number, string> = {
      0: 'Despejado', 1: 'Mayormente despejado', 2: 'Parcialmente nublado',
      3: 'Nublado', 45: 'Niebla', 48: 'Niebla con escarcha',
      51: 'Llovizna débil', 53: 'Llovizna', 55: 'Llovizna intensa',
      61: 'Lluvia débil', 63: 'Lluvia', 65: 'Lluvia fuerte',
      71: 'Nieve débil', 73: 'Nieve', 75: 'Nieve fuerte',
      80: 'Chubascos', 81: 'Chubascos fuertes', 82: 'Chubascos muy fuertes',
      95: 'Tormenta', 96: 'Tormenta con granizo', 99: 'Tormenta severa'
    };
    return map[code] ?? 'Desconocido';
  }
}