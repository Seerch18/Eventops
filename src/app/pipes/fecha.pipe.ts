import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha',
})
export class FechaPipe implements PipeTransform {
  transform(fecha: Date, ...args: unknown[]): unknown {
    return Date.now();
  }
}
