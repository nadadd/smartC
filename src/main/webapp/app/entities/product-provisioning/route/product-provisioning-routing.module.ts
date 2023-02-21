import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProductProvisioningComponent } from '../list/product-provisioning.component';
import { ProductProvisioningDetailComponent } from '../detail/product-provisioning-detail.component';
import { ProductProvisioningUpdateComponent } from '../update/product-provisioning-update.component';
import { ProductProvisioningRoutingResolveService } from './product-provisioning-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const productProvisioningRoute: Routes = [
  {
    path: '',
    component: ProductProvisioningComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProductProvisioningDetailComponent,
    resolve: {
      productProvisioning: ProductProvisioningRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProductProvisioningUpdateComponent,
    resolve: {
      productProvisioning: ProductProvisioningRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProductProvisioningUpdateComponent,
    resolve: {
      productProvisioning: ProductProvisioningRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(productProvisioningRoute)],
  exports: [RouterModule],
})
export class ProductProvisioningRoutingModule {}
