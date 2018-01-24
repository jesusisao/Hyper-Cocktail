import { Directive, ElementRef, Input, OnInit, HostListener } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[myColored]'
})

export class ColoredDirective implements OnInit {
    // tslint:disable-next-line:no-input-rename
    @Input('myColored') color = '#cff';

    constructor (private el: ElementRef) {}

    ngOnInit() {
    }

    @HostListener('mouseenter') onmouseenter() {
        this.el.nativeElement.style.backgroundColor = this.color;
    }

    @HostListener('mouseleave') onmouseleave() {
        this.el.nativeElement.style.backgroundColor = '';
    }
}
