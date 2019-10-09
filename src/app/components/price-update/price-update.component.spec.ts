import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatButtonModule, MatInputModule} from '@angular/material';

import {PriceUpdateComponent} from './price-update.component';
import {AppComponent} from '../../app.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

import utils from '../../utils';

describe('PriceUpdateComponent', () => {
  let component: PriceUpdateComponent;
  let fixture: ComponentFixture<PriceUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PriceUpdateComponent,
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correct init public variables', () => {
    const { value, updatedNumber, finalResult } = component;
    expect(value).toBe('');
    expect(updatedNumber).toBe(0);
    expect(finalResult).toBe(undefined);
  });

  it('should correctly work with time limitation', () => {
    const value = '1000000000';
    component.value = value;
    jasmine.clock().install();
    component.updateValue();
    jasmine.clock().tick(2500);
    expect(component.updatedNumber).toBe(Number(value));
    jasmine.clock().uninstall();
  });

  it('should correctly parse string', () => {
    component.value = '10';

    component.updateValue();

    expect(component.finalResult).toBe(10);
  });

  it('should generate error', () => {
    spyOn(window, 'alert');
    component.value = '-5';
    component.updateValue();
    expect(window.alert).toHaveBeenCalledWith('Number is not valid!');
  });

  it('should correctly work with hardcoded values', () => {
    component.value = '10';
    // tslint:disable-next-line:max-line-length
    const expectedValues = [1, 1.9, 2.71, 3.44, 4.1, 4.69, 5.22, 5.7, 6.13, 6.52, 6.87, 7.18, 7.46, 7.71, 7.94, 8.15, 8.33, 8.5, 8.65, 8.78, 8.9, 9.01, 10];

    jasmine.clock().install();
    component.updateValue();
    expectedValues.forEach((time) => {
      expect(component.updatedNumber).toBe(Number(time));
      jasmine.clock().tick(10);
    });

    jasmine.clock().uninstall();
  });

  it('should correctly work with generated values', () => {
    component.value = '100';
    let prevUpdatedNumber = 1;
    jasmine.clock().install();
    component.updateValue();
    while (component.updatedNumber < component.finalResult) {
      prevUpdatedNumber = utils.toNumber(component.updatedNumber, 2);

      if (component.updatedNumber === 0) {
        expect(component.updatedNumber).toBe(1);
      } else {
        expect(component.updatedNumber).toBe(prevUpdatedNumber);
      }

      jasmine.clock().tick(10);
    }

    jasmine.clock().uninstall();
  });
});
