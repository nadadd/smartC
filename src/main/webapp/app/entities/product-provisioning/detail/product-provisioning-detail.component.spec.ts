import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProductProvisioningDetailComponent } from './product-provisioning-detail.component';

describe('ProductProvisioning Management Detail Component', () => {
  let comp: ProductProvisioningDetailComponent;
  let fixture: ComponentFixture<ProductProvisioningDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductProvisioningDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ productProvisioning: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(ProductProvisioningDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(ProductProvisioningDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load productProvisioning on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.productProvisioning).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
