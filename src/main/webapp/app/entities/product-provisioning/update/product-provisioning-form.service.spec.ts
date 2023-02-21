import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../product-provisioning.test-samples';

import { ProductProvisioningFormService } from './product-provisioning-form.service';

describe('ProductProvisioning Form Service', () => {
  let service: ProductProvisioningFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductProvisioningFormService);
  });

  describe('Service methods', () => {
    describe('createProductProvisioningFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProductProvisioningFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quantite: expect.any(Object),
            dateProcuration: expect.any(Object),
            product: expect.any(Object),
          })
        );
      });

      it('passing IProductProvisioning should create a new form with FormGroup', () => {
        const formGroup = service.createProductProvisioningFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quantite: expect.any(Object),
            dateProcuration: expect.any(Object),
            product: expect.any(Object),
          })
        );
      });
    });

    describe('getProductProvisioning', () => {
      it('should return NewProductProvisioning for default ProductProvisioning initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createProductProvisioningFormGroup(sampleWithNewData);

        const productProvisioning = service.getProductProvisioning(formGroup) as any;

        expect(productProvisioning).toMatchObject(sampleWithNewData);
      });

      it('should return NewProductProvisioning for empty ProductProvisioning initial value', () => {
        const formGroup = service.createProductProvisioningFormGroup();

        const productProvisioning = service.getProductProvisioning(formGroup) as any;

        expect(productProvisioning).toMatchObject({});
      });

      it('should return IProductProvisioning', () => {
        const formGroup = service.createProductProvisioningFormGroup(sampleWithRequiredData);

        const productProvisioning = service.getProductProvisioning(formGroup) as any;

        expect(productProvisioning).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProductProvisioning should not enable id FormControl', () => {
        const formGroup = service.createProductProvisioningFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProductProvisioning should disable id FormControl', () => {
        const formGroup = service.createProductProvisioningFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
