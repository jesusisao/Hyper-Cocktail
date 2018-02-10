// 勉強用
import { Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[myDeadline]'
})
export class DeadlineDirective implements OnChanges {
    // 期限を表すmyDeadline属性を宣言
    // tslint:disable-next-line:no-input-rename
    @Input('myDeadline') deadline: Date;

    constructor(private templateRef: TemplateRef<any>, private viewConttainer: ViewContainerRef) {
    }

    // myDeadline属性を変更した時に、テンプレートの表示／非表示を判定
    ngOnChanges(): void {
        if (this.deadline.getTime() < (new Date()).getTime()) {
            this.viewConttainer.clear();
        } else {
            this.viewConttainer.createEmbeddedView(this.templateRef);
        }
    }


}
