import dayjs from 'dayjs/esm';
import { IProduct } from 'app/entities/product/product.model';

export interface IProductProvisioning {
  id: number;
  quantite?: number | null;
  dateProcuration?: dayjs.Dayjs | null;
  product?: Pick<IProduct, 'id'> | null;
}

export type NewProductProvisioning = Omit<IProductProvisioning, 'id'> & { id: null };
