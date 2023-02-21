import dayjs from 'dayjs/esm';
import { IFournisseur } from 'app/entities/fournisseur/fournisseur.model';
import { ProductState } from 'app/entities/enumerations/product-state.model';

export interface IProduct {
  id: number;
  nom?: string | null;
  totalQuantite?: number | null;
  prixBase?: number | null;
  etat?: ProductState | null;
  dateAjout?: dayjs.Dayjs | null;
  fournisseur?: Pick<IFournisseur, 'id'> | null;
}

export type NewProduct = Omit<IProduct, 'id'> & { id: null };
