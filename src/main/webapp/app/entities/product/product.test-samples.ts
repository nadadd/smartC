import dayjs from 'dayjs/esm';

import { ProductState } from 'app/entities/enumerations/product-state.model';

import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 77672,
  nom: 'Customer-focused',
  prixBase: 96307,
  etat: ProductState['DEMANDE'],
};

export const sampleWithPartialData: IProduct = {
  id: 7747,
  nom: 'Programmable Networked deliver',
  prixBase: 39641,
  etat: ProductState['DEMANDE'],
  dateAjout: dayjs('2023-02-16T05:26'),
};

export const sampleWithFullData: IProduct = {
  id: 71472,
  nom: 'Stravenue',
  totalQuantite: 66440,
  prixBase: 85387,
  etat: ProductState['DEMANDE'],
  dateAjout: dayjs('2023-02-15T20:37'),
};

export const sampleWithNewData: NewProduct = {
  nom: 'Automotive Assurance',
  prixBase: 33131,
  etat: ProductState['IN_STOCK'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
