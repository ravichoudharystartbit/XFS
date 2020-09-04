import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentTestPage } from './paymentTest.page';

describe('PaymentTestPage', () => {
  let component: PaymentTestPage;
  let fixture: ComponentFixture<PaymentTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
