import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductProvisioning } from '../product-provisioning.model';
import { ProductProvisioningService } from '../service/product-provisioning.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './product-provisioning-delete-dialog.component.html',
})
export class ProductProvisioningDeleteDialogComponent {
  productProvisioning?: IProductProvisioning;

  constructor(protected productProvisioningService: ProductProvisioningService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productProvisioningService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
