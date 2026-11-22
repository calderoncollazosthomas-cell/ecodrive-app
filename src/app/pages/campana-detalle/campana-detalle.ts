
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CampaignsService, Campaign } from '../../services/campaigns';

@Component({
  selector: 'app-campana-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './campana-detalle.html',
  styleUrl: './campana-detalle.scss'
})
export class CampanaDetalle implements OnInit {

  private route = inject(ActivatedRoute);
  private campaignsService = inject(CampaignsService);

  campaign: Campaign | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      if (Number.isInteger(id) && id > 0) {
        this.campaign = this.campaignsService.getCampaignById(id);
      } else {
        this.campaign = undefined;
      }
    });
  }
}
