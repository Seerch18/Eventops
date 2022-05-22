import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha',
})
export class FechaPipe implements PipeTransform {
  transform(fecha: Date, ...args: unknown[]): unknown {
    return `${fecha.getFullYear()}-${fecha
      .getMonth()
      .toString()
      .padStart(2, '0')}-${fecha.getDay().toString().padStart(2, '0')}`;
  }
}
