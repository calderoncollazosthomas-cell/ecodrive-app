
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CampaignsService } from '../../services/campaigns';

@Component({
  selector: 'app-campanas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './campanas.html',
  styleUrl: './campanas.scss'
})
export class Campanas {
  private campaignsService = inject(CampaignsService);

  campaigns = this.campaignsService.getCampaigns();
}
