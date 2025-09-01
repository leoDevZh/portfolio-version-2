import {Directive, HostBinding, Input, signal} from '@angular/core';

@Directive()
export class AbstractIndexIndicatorDirective {

  constructor() { }

  @Input()
  numberOfSlides: number = 0
  @Input()
  color: string = '#dddadc'
  @Input()
  selectedColor: string = '#020002'

  currentIndex = signal<number>(0)

  get numberArray(): number[] {
    return Array.from({length: this.numberOfSlides}, (_, i) => i)
  }

  @HostBinding('style.--indicator-color')
  get indicatorColor() {
    return this.color
  }

  @HostBinding('style.--selected-indicator-color')
  get selectedIndicatorColor() {
    return this.selectedColor
  }
}
