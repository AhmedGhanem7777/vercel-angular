import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext'
})
export class CuttextPipe implements PipeTransform {

  transform(input: string, length: number): string {
    if (!input || length<=0) return input;

    return input.length > length ? input.slice(0, length) + ' . . . ' : input;
  }

}
