import { IUser } from 'app/entities/user/user.model';

export interface IFournisseur {
  id: number;
  nom?: string | null;
  client?: Pick<IUser, 'id'> | null;
}

export type NewFournisseur = Omit<IFournisseur, 'id'> & { id: null };
