import { IFournisseur, NewFournisseur } from './fournisseur.model';

export const sampleWithRequiredData: IFournisseur = {
  id: 12366,
};

export const sampleWithPartialData: IFournisseur = {
  id: 70117,
  nom: "Jamaican Iowa Pa'anga",
};

export const sampleWithFullData: IFournisseur = {
  id: 47638,
  nom: 'compress Configuration digital',
};

export const sampleWithNewData: NewFournisseur = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
