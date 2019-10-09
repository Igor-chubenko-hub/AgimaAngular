import { Component } from '@angular/core';

import utils from '../../utils/';

@Component({
  selector: 'app-price-update',
  templateUrl: './price-update.component.html',
  styleUrls: ['./price-update.component.css']
})
export class PriceUpdateComponent {
  public value = '';
  public finalResult: number;
  public updatedNumber = 0;

  private step: number;
  private timerId: Timer = null;
  private timeout = 10;

  constructor() {
    this.change = this.change.bind(this);
  }

  private setFinalResult(): void | never {
    this.finalResult = parseFloat(this.value);
    if (Number.isNaN(this.finalResult) || this.finalResult <= 0) {
      throw new Error('Number is not valid!');
    }
  }

  setStep(): void {
    const difference = Math.abs(this.finalResult - this.updatedNumber);

    if (this.updatedNumber === 0) {
      this.step = difference > 1 ? 1 : difference;
    } else if (difference < 1) {
      this.step = difference;
    } else {
      this.step = utils.toNumber(difference * 0.1, 2);
    }
  }

  private change(operationType: 'inc' | 'dec'): void {
    this.setStep();
    if (operationType === 'inc' && this.updatedNumber < this.finalResult) {
      this.updatedNumber = utils.toNumber(this.updatedNumber + this.step, 2);
      this.timerId = setTimeout(this.change, this.timeout, operationType);
    } else if (operationType === 'dec' && this.updatedNumber > this.finalResult) {
      this.updatedNumber = utils.toNumber(this.updatedNumber - this.step, 2);
      this.timerId = setTimeout(this.change, this.timeout, operationType);
    } else {
      this.updatedNumber = utils.toNumber(this.finalResult, 2);
      this.timerId = null;
    }
  }

  updateValue(): void {
    try {
      if (this.timerId !== null) {
        clearTimeout(this.timerId);
      }
      this.setFinalResult();
      if (this.updatedNumber < this.finalResult) {
        this.change('inc');
      } else {
        this.change('dec');
      }

    } catch (err) {
      alert(err.message);
    }
  }
}
