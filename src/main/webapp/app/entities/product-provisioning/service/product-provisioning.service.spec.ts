import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProductProvisioning } from '../product-provisioning.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../product-provisioning.test-samples';

import { ProductProvisioningService, RestProductProvisioning } from './product-provisioning.service';

const requireRestSample: RestProductProvisioning = {
  ...sampleWithRequiredData,
  dateProcuration: sampleWithRequiredData.dateProcuration?.toJSON(),
};

describe('ProductProvisioning Service', () => {
  let service: ProductProvisioningService;
  let httpMock: HttpTestingController;
  let expectedResult: IProductProvisioning | IProductProvisioning[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ProductProvisioningService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a ProductProvisioning', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const productProvisioning = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(productProvisioning).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProductProvisioning', () => {
      const productProvisioning = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(productProvisioning).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProductProvisioning', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProductProvisioning', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ProductProvisioning', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProductProvisioningToCollectionIfMissing', () => {
      it('should add a ProductProvisioning to an empty array', () => {
        const productProvisioning: IProductProvisioning = sampleWithRequiredData;
        expectedResult = service.addProductProvisioningToCollectionIfMissing([], productProvisioning);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(productProvisioning);
      });

      it('should not add a ProductProvisioning to an array that contains it', () => {
        const productProvisioning: IProductProvisioning = sampleWithRequiredData;
        const productProvisioningCollection: IProductProvisioning[] = [
          {
            ...productProvisioning,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProductProvisioningToCollectionIfMissing(productProvisioningCollection, productProvisioning);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProductProvisioning to an array that doesn't contain it", () => {
        const productProvisioning: IProductProvisioning = sampleWithRequiredData;
        const productProvisioningCollection: IProductProvisioning[] = [sampleWithPartialData];
        expectedResult = service.addProductProvisioningToCollectionIfMissing(productProvisioningCollection, productProvisioning);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(productProvisioning);
      });

      it('should add only unique ProductProvisioning to an array', () => {
        const productProvisioningArray: IProductProvisioning[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const productProvisioningCollection: IProductProvisioning[] = [sampleWithRequiredData];
        expectedResult = service.addProductProvisioningToCollectionIfMissing(productProvisioningCollection, ...productProvisioningArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const productProvisioning: IProductProvisioning = sampleWithRequiredData;
        const productProvisioning2: IProductProvisioning = sampleWithPartialData;
        expectedResult = service.addProductProvisioningToCollectionIfMissing([], productProvisioning, productProvisioning2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(productProvisioning);
        expect(expectedResult).toContain(productProvisioning2);
      });

      it('should accept null and undefined values', () => {
        const productProvisioning: IProductProvisioning = sampleWithRequiredData;
        expectedResult = service.addProductProvisioningToCollectionIfMissing([], null, productProvisioning, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(productProvisioning);
      });

      it('should return initial array if no ProductProvisioning is added', () => {
        const productProvisioningCollection: IProductProvisioning[] = [sampleWithRequiredData];
        expectedResult = service.addProductProvisioningToCollectionIfMissing(productProvisioningCollection, undefined, null);
        expect(expectedResult).toEqual(productProvisioningCollection);
      });
    });

    describe('compareProductProvisioning', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProductProvisioning(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareProductProvisioning(entity1, entity2);
        const compareResult2 = service.compareProductProvisioning(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareProductProvisioning(entity1, entity2);
        const compareResult2 = service.compareProductProvisioning(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareProductProvisioning(entity1, entity2);
        const compareResult2 = service.compareProductProvisioning(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
