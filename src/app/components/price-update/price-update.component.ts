import { Component } from '@angular/core';

@Component({
  selector: 'app-price-update',
  templateUrl: './price-update.component.html',
  styleUrls: ['./price-update.component.css']
})
export class PriceUpdateComponent {
  public number = '';
  public updatedNumber = 0;
  public condition: number;
  public step: number;

  setCondition() {
    this.condition = parseFloat(this.number);
  }

  setStep(): void {
    if (this.updatedNumber === 0) {
      this.step = 1;
    } else if (this.updatedNumber > 0) {
      this.step = Math.ceil(this.updatedNumber / 100);
    } else if (this.updatedNumber < 0)  {
      this.step = Math.ceil(-(this.updatedNumber) / 100);
    }
  }

  removeTimer(timer): void {
    if (this.updatedNumber === Number(this.condition.toFixed(2))) {
      clearInterval(timer);
    }
  }

  increase(): void {
    if (this.updatedNumber !== this.condition) {
      this.updatedNumber += this.step;
      this.updatedNumber = Number(this.updatedNumber.toFixed(2));
      if (this.updatedNumber > this.condition) {
        this.updatedNumber = Number(this.condition.toFixed(2));
      }
    }
  }

  decrease(): void {
    if (this.updatedNumber !== this.condition) {
      this.updatedNumber -= this.step;
      this.updatedNumber = Number(this.updatedNumber.toFixed(2));
      if (this.updatedNumber < this.condition) {
        this.updatedNumber = Number(this.condition.toFixed(2));
      }
    }
  }

  updateNumber(): void {
    this.setCondition();
    const timer = setInterval(() => {
      this.setStep();
      if (this.updatedNumber < this.condition) {
        this.increase();
      } else {
        this.decrease();
      }
      this.removeTimer(timer);
    }, 10);
    this.number = '';
  }
}
