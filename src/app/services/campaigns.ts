
import { Injectable } from '@angular/core';

export interface Campaign {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  status: string;
  materials: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  private campaigns: Campaign[] = [
    {
      id: 1,
      title: 'Reciclatón por Bogotá',
      description: 'Jornada de recolección de materiales reciclables para promover una ciudad más limpia y sostenible.',
      date: '15 de diciembre de 2026',
      location: 'Parque Simón Bolívar, Bogotá',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
      status: 'Próxima',
      materials: ['Papel', 'Cartón', 'Plástico']
    },
    {
      id: 2,
      title: 'Un planeta sin plástico',
      description: 'Campaña para reducir el uso de plásticos y fomentar su correcta separación y aprovechamiento.',
      date: '20 de diciembre de 2026',
      location: 'Parque de los Novios, Bogotá',
      image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800',
      status: 'Próxima',
      materials: ['Botellas', 'Envases', 'Plástico']
    },
    {
      id: 3,
      title: 'Dale vida al papel',
      description: 'Invitamos a la comunidad a recolectar papel y cartón para darles una segunda oportunidad.',
      date: '10 de enero de 2027',
      location: 'Biblioteca Virgilio Barco, Bogotá',
      image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800',
      status: 'Próxima',
      materials: ['Papel', 'Cartón', 'Revistas']
    }
  ];

  getCampaigns(): Campaign[] {
    return this.campaigns;
  }

  getCampaignById(id: number): Campaign | undefined {
    return this.campaigns.find(campaign => campaign.id === id);
  }
}
