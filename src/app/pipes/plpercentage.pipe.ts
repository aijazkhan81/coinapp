import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plPercentage'
})
export class PlpercentagePipe implements PipeTransform {

  transform(value: any): any {
    return `(${value})%`;
  }

}
