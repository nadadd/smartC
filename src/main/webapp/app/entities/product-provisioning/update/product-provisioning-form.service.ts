import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IProductProvisioning, NewProductProvisioning } from '../product-provisioning.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProductProvisioning for edit and NewProductProvisioningFormGroupInput for create.
 */
type ProductProvisioningFormGroupInput = IProductProvisioning | PartialWithRequiredKeyOf<NewProductProvisioning>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IProductProvisioning | NewProductProvisioning> = Omit<T, 'dateProcuration'> & {
  dateProcuration?: string | null;
};

type ProductProvisioningFormRawValue = FormValueOf<IProductProvisioning>;

type NewProductProvisioningFormRawValue = FormValueOf<NewProductProvisioning>;

type ProductProvisioningFormDefaults = Pick<NewProductProvisioning, 'id' | 'dateProcuration'>;

type ProductProvisioningFormGroupContent = {
  id: FormControl<ProductProvisioningFormRawValue['id'] | NewProductProvisioning['id']>;
  quantite: FormControl<ProductProvisioningFormRawValue['quantite']>;
  dateProcuration: FormControl<ProductProvisioningFormRawValue['dateProcuration']>;
  product: FormControl<ProductProvisioningFormRawValue['product']>;
};

export type ProductProvisioningFormGroup = FormGroup<ProductProvisioningFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProductProvisioningFormService {
  createProductProvisioningFormGroup(productProvisioning: ProductProvisioningFormGroupInput = { id: null }): ProductProvisioningFormGroup {
    const productProvisioningRawValue = this.convertProductProvisioningToProductProvisioningRawValue({
      ...this.getFormDefaults(),
      ...productProvisioning,
    });
    return new FormGroup<ProductProvisioningFormGroupContent>({
      id: new FormControl(
        { value: productProvisioningRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      quantite: new FormControl(productProvisioningRawValue.quantite, {
        validators: [Validators.required],
      }),
      dateProcuration: new FormControl(productProvisioningRawValue.dateProcuration, {
        validators: [Validators.required],
      }),
      product: new FormControl(productProvisioningRawValue.product, {
        validators: [Validators.required],
      }),
    });
  }

  getProductProvisioning(form: ProductProvisioningFormGroup): IProductProvisioning | NewProductProvisioning {
    return this.convertProductProvisioningRawValueToProductProvisioning(
      form.getRawValue() as ProductProvisioningFormRawValue | NewProductProvisioningFormRawValue
    );
  }

  resetForm(form: ProductProvisioningFormGroup, productProvisioning: ProductProvisioningFormGroupInput): void {
    const productProvisioningRawValue = this.convertProductProvisioningToProductProvisioningRawValue({
      ...this.getFormDefaults(),
      ...productProvisioning,
    });
    form.reset(
      {
        ...productProvisioningRawValue,
        id: { value: productProvisioningRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ProductProvisioningFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dateProcuration: currentTime,
    };
  }

  private convertProductProvisioningRawValueToProductProvisioning(
    rawProductProvisioning: ProductProvisioningFormRawValue | NewProductProvisioningFormRawValue
  ): IProductProvisioning | NewProductProvisioning {
    return {
      ...rawProductProvisioning,
      dateProcuration: dayjs(rawProductProvisioning.dateProcuration, DATE_TIME_FORMAT),
    };
  }

  private convertProductProvisioningToProductProvisioningRawValue(
    productProvisioning: IProductProvisioning | (Partial<NewProductProvisioning> & ProductProvisioningFormDefaults)
  ): ProductProvisioningFormRawValue | PartialWithRequiredKeyOf<NewProductProvisioningFormRawValue> {
    return {
      ...productProvisioning,
      dateProcuration: productProvisioning.dateProcuration ? productProvisioning.dateProcuration.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
