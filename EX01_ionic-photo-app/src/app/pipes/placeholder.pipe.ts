import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeholder'
})
export class PlaceholderPipe implements PipeTransform {

  transform(value: any, _default: string = 'Sin Texto' ): any {

    return (value) ? value : _default;
  }

}
