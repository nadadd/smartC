import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFournisseur } from '../fournisseur.model';
import { FournisseurService } from '../service/fournisseur.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './fournisseur-delete-dialog.component.html',
})
export class FournisseurDeleteDialogComponent {
  fournisseur?: IFournisseur;

  constructor(protected fournisseurService: FournisseurService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fournisseurService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
