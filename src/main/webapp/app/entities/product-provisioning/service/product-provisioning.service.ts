import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProductProvisioning, NewProductProvisioning } from '../product-provisioning.model';

export type PartialUpdateProductProvisioning = Partial<IProductProvisioning> & Pick<IProductProvisioning, 'id'>;

type RestOf<T extends IProductProvisioning | NewProductProvisioning> = Omit<T, 'dateProcuration'> & {
  dateProcuration?: string | null;
};

export type RestProductProvisioning = RestOf<IProductProvisioning>;

export type NewRestProductProvisioning = RestOf<NewProductProvisioning>;

export type PartialUpdateRestProductProvisioning = RestOf<PartialUpdateProductProvisioning>;

export type EntityResponseType = HttpResponse<IProductProvisioning>;
export type EntityArrayResponseType = HttpResponse<IProductProvisioning[]>;

@Injectable({ providedIn: 'root' })
export class ProductProvisioningService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/product-provisionings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(productProvisioning: NewProductProvisioning): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productProvisioning);
    return this.http
      .post<RestProductProvisioning>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(productProvisioning: IProductProvisioning): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productProvisioning);
    return this.http
      .put<RestProductProvisioning>(`${this.resourceUrl}/${this.getProductProvisioningIdentifier(productProvisioning)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(productProvisioning: PartialUpdateProductProvisioning): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(productProvisioning);
    return this.http
      .patch<RestProductProvisioning>(`${this.resourceUrl}/${this.getProductProvisioningIdentifier(productProvisioning)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestProductProvisioning>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestProductProvisioning[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getProductProvisioningIdentifier(productProvisioning: Pick<IProductProvisioning, 'id'>): number {
    return productProvisioning.id;
  }

  compareProductProvisioning(o1: Pick<IProductProvisioning, 'id'> | null, o2: Pick<IProductProvisioning, 'id'> | null): boolean {
    return o1 && o2 ? this.getProductProvisioningIdentifier(o1) === this.getProductProvisioningIdentifier(o2) : o1 === o2;
  }

  addProductProvisioningToCollectionIfMissing<Type extends Pick<IProductProvisioning, 'id'>>(
    productProvisioningCollection: Type[],
    ...productProvisioningsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const productProvisionings: Type[] = productProvisioningsToCheck.filter(isPresent);
    if (productProvisionings.length > 0) {
      const productProvisioningCollectionIdentifiers = productProvisioningCollection.map(
        productProvisioningItem => this.getProductProvisioningIdentifier(productProvisioningItem)!
      );
      const productProvisioningsToAdd = productProvisionings.filter(productProvisioningItem => {
        const productProvisioningIdentifier = this.getProductProvisioningIdentifier(productProvisioningItem);
        if (productProvisioningCollectionIdentifiers.includes(productProvisioningIdentifier)) {
          return false;
        }
        productProvisioningCollectionIdentifiers.push(productProvisioningIdentifier);
        return true;
      });
      return [...productProvisioningsToAdd, ...productProvisioningCollection];
    }
    return productProvisioningCollection;
  }

  protected convertDateFromClient<T extends IProductProvisioning | NewProductProvisioning | PartialUpdateProductProvisioning>(
    productProvisioning: T
  ): RestOf<T> {
    return {
      ...productProvisioning,
      dateProcuration: productProvisioning.dateProcuration?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restProductProvisioning: RestProductProvisioning): IProductProvisioning {
    return {
      ...restProductProvisioning,
      dateProcuration: restProductProvisioning.dateProcuration ? dayjs(restProductProvisioning.dateProcuration) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestProductProvisioning>): HttpResponse<IProductProvisioning> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestProductProvisioning[]>): HttpResponse<IProductProvisioning[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
