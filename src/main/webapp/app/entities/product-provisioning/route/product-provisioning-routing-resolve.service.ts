import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProductProvisioning } from '../product-provisioning.model';
import { ProductProvisioningService } from '../service/product-provisioning.service';

@Injectable({ providedIn: 'root' })
export class ProductProvisioningRoutingResolveService implements Resolve<IProductProvisioning | null> {
  constructor(protected service: ProductProvisioningService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductProvisioning | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((productProvisioning: HttpResponse<IProductProvisioning>) => {
          if (productProvisioning.body) {
            return of(productProvisioning.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
