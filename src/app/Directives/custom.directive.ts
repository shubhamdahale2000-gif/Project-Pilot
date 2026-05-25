import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appCustom]',
    standalone: false
})
export class CustomDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'color', 'red');
  }

  ngOnDestroy() {
    this.renderer.removeStyle(this.el.nativeElement, 'color');
  }

}
