import dayjs from 'dayjs/esm';

import { IProductProvisioning, NewProductProvisioning } from './product-provisioning.model';

export const sampleWithRequiredData: IProductProvisioning = {
  id: 74858,
  quantite: 83035,
  dateProcuration: dayjs('2023-02-16T14:26'),
};

export const sampleWithPartialData: IProductProvisioning = {
  id: 11790,
  quantite: 51611,
  dateProcuration: dayjs('2023-02-15T21:47'),
};

export const sampleWithFullData: IProductProvisioning = {
  id: 45497,
  quantite: 35210,
  dateProcuration: dayjs('2023-02-16T12:23'),
};

export const sampleWithNewData: NewProductProvisioning = {
  quantite: 44886,
  dateProcuration: dayjs('2023-02-16T09:43'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
