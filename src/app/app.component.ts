import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public number = '';
  public updatedNumber = 0;
  public condition: number;
  public step: number;

  setCondition() {
    this.condition = parseFloat(this.number);
  }

  setStep() {
    if (this.updatedNumber === 0) {
      this.step = 1;
    } else if (this.updatedNumber > 0) {
      this.step = Math.ceil(this.updatedNumber / 100);
    } else if (this.updatedNumber < 0)  {
      this.step = Math.ceil(-(this.updatedNumber) / 100);
    }
  }

  updateNumber() {
    this.setCondition();
    const timer = setInterval(() => {
      console.log('processing');
      this.setStep();
      if (this.updatedNumber < this.condition) {
        if (this.updatedNumber !== this.condition) {
          this.updatedNumber += this.step;
          this.updatedNumber = Number(this.updatedNumber.toFixed(2));
          if (this.updatedNumber > this.condition) {
            this.updatedNumber = Number(this.condition.toFixed(2));
          }
        }
      } else {
        if (this.updatedNumber !== this.condition) {
          this.updatedNumber -= this.step;
          this.updatedNumber = Number(this.updatedNumber.toFixed(2));
          if (this.updatedNumber < this.condition) {
            this.updatedNumber = Number(this.condition.toFixed(2));
          }
        }
      }
      if (this.updatedNumber === Number(this.condition.toFixed(2))) {
        clearInterval(timer);
      }
    }, 10);
    this.number = '';
  }
}
