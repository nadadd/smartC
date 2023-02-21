import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ProductProvisioningFormService } from './product-provisioning-form.service';
import { ProductProvisioningService } from '../service/product-provisioning.service';
import { IProductProvisioning } from '../product-provisioning.model';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

import { ProductProvisioningUpdateComponent } from './product-provisioning-update.component';

describe('ProductProvisioning Management Update Component', () => {
  let comp: ProductProvisioningUpdateComponent;
  let fixture: ComponentFixture<ProductProvisioningUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let productProvisioningFormService: ProductProvisioningFormService;
  let productProvisioningService: ProductProvisioningService;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ProductProvisioningUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ProductProvisioningUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProductProvisioningUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    productProvisioningFormService = TestBed.inject(ProductProvisioningFormService);
    productProvisioningService = TestBed.inject(ProductProvisioningService);
    productService = TestBed.inject(ProductService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Product query and add missing value', () => {
      const productProvisioning: IProductProvisioning = { id: 456 };
      const product: IProduct = { id: 75798 };
      productProvisioning.product = product;

      const productCollection: IProduct[] = [{ id: 74890 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [product];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ productProvisioning });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(
        productCollection,
        ...additionalProducts.map(expect.objectContaining)
      );
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const productProvisioning: IProductProvisioning = { id: 456 };
      const product: IProduct = { id: 69835 };
      productProvisioning.product = product;

      activatedRoute.data = of({ productProvisioning });
      comp.ngOnInit();

      expect(comp.productsSharedCollection).toContain(product);
      expect(comp.productProvisioning).toEqual(productProvisioning);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProductProvisioning>>();
      const productProvisioning = { id: 123 };
      jest.spyOn(productProvisioningFormService, 'getProductProvisioning').mockReturnValue(productProvisioning);
      jest.spyOn(productProvisioningService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productProvisioning });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: productProvisioning }));
      saveSubject.complete();

      // THEN
      expect(productProvisioningFormService.getProductProvisioning).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(productProvisioningService.update).toHaveBeenCalledWith(expect.objectContaining(productProvisioning));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProductProvisioning>>();
      const productProvisioning = { id: 123 };
      jest.spyOn(productProvisioningFormService, 'getProductProvisioning').mockReturnValue({ id: null });
      jest.spyOn(productProvisioningService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productProvisioning: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: productProvisioning }));
      saveSubject.complete();

      // THEN
      expect(productProvisioningFormService.getProductProvisioning).toHaveBeenCalled();
      expect(productProvisioningService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProductProvisioning>>();
      const productProvisioning = { id: 123 };
      jest.spyOn(productProvisioningService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ productProvisioning });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(productProvisioningService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProduct', () => {
      it('Should forward to productService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(productService, 'compareProduct');
        comp.compareProduct(entity, entity2);
        expect(productService.compareProduct).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
