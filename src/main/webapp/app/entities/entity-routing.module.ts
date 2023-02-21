import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'fournisseur',
        data: { pageTitle: 'frontEndApp.fournisseur.home.title' },
        loadChildren: () => import('./fournisseur/fournisseur.module').then(m => m.FournisseurModule),
      },
      {
        path: 'product',
        data: { pageTitle: 'frontEndApp.product.home.title' },
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },
      {
        path: 'product-provisioning',
        data: { pageTitle: 'frontEndApp.productProvisioning.home.title' },
        loadChildren: () => import('./product-provisioning/product-provisioning.module').then(m => m.ProductProvisioningModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
