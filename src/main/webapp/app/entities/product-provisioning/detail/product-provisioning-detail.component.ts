import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductProvisioning } from '../product-provisioning.model';

@Component({
  selector: 'jhi-product-provisioning-detail',
  templateUrl: './product-provisioning-detail.component.html',
})
export class ProductProvisioningDetailComponent implements OnInit {
  productProvisioning: IProductProvisioning | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productProvisioning }) => {
      this.productProvisioning = productProvisioning;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
