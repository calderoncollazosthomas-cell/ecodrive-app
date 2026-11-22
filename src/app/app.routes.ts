
import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Agendar } from './pages/agendar/agendar';
import { Conocenos } from './pages/conocenos/conocenos';
import { Campanas } from './pages/campanas/campanas';
import { CampanaDetalle } from './pages/campana-detalle/campana-detalle';
import { Weather } from './weather/weather';

export const routes: Routes = [

  {
    path: '',
    component: Home
  },

  {
    path: 'agendar',
    component: Agendar
  },

  {
    path: 'conocenos',
    component: Conocenos
  },

  {
    path: 'campanas',
    component: Campanas
  },

  {
    path: 'campanas/:id',
    component: CampanaDetalle
  },

  {
    path: 'clima',
    component: Weather
  },

  {
    path: '**',
    redirectTo: ''
  }

];
