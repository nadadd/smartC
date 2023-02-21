import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ProductProvisioningFormService, ProductProvisioningFormGroup } from './product-provisioning-form.service';
import { IProductProvisioning } from '../product-provisioning.model';
import { ProductProvisioningService } from '../service/product-provisioning.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

@Component({
  selector: 'jhi-product-provisioning-update',
  templateUrl: './product-provisioning-update.component.html',
})
export class ProductProvisioningUpdateComponent implements OnInit {
  isSaving = false;
  productProvisioning: IProductProvisioning | null = null;

  productsSharedCollection: IProduct[] = [];

  editForm: ProductProvisioningFormGroup = this.productProvisioningFormService.createProductProvisioningFormGroup();

  constructor(
    protected productProvisioningService: ProductProvisioningService,
    protected productProvisioningFormService: ProductProvisioningFormService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareProduct = (o1: IProduct | null, o2: IProduct | null): boolean => this.productService.compareProduct(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productProvisioning }) => {
      this.productProvisioning = productProvisioning;
      if (productProvisioning) {
        this.updateForm(productProvisioning);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productProvisioning = this.productProvisioningFormService.getProductProvisioning(this.editForm);
    if (productProvisioning.id !== null) {
      this.subscribeToSaveResponse(this.productProvisioningService.update(productProvisioning));
    } else {
      this.subscribeToSaveResponse(this.productProvisioningService.create(productProvisioning));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductProvisioning>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(productProvisioning: IProductProvisioning): void {
    this.productProvisioning = productProvisioning;
    this.productProvisioningFormService.resetForm(this.editForm, productProvisioning);

    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing<IProduct>(
      this.productsSharedCollection,
      productProvisioning.product
    );
  }

  protected loadRelationshipsOptions(): void {
    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(
        map((products: IProduct[]) =>
          this.productService.addProductToCollectionIfMissing<IProduct>(products, this.productProvisioning?.product)
        )
      )
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));
  }
}
