import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyJpyToNum' })

export class CurrencyJpyToNumPipe implements PipeTransform {
    transform(value: string): string {
        const regExp = new RegExp('[,\\]', 'g');
        return value.replace(regExp, '');
    }
}
