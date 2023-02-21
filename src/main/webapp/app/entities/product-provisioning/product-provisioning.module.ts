import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProductProvisioningComponent } from './list/product-provisioning.component';
import { ProductProvisioningDetailComponent } from './detail/product-provisioning-detail.component';
import { ProductProvisioningUpdateComponent } from './update/product-provisioning-update.component';
import { ProductProvisioningDeleteDialogComponent } from './delete/product-provisioning-delete-dialog.component';
import { ProductProvisioningRoutingModule } from './route/product-provisioning-routing.module';

@NgModule({
  imports: [SharedModule, ProductProvisioningRoutingModule],
  declarations: [
    ProductProvisioningComponent,
    ProductProvisioningDetailComponent,
    ProductProvisioningUpdateComponent,
    ProductProvisioningDeleteDialogComponent,
  ],
})
export class ProductProvisioningModule {}
