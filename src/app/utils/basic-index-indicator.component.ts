import {Component, HostBinding, Input} from '@angular/core';
import {AbstractIndexIndicatorDirective} from "./abstract-index-indicator.directive";

@Component({
  selector: 'leo-basic-index-indicator',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: AbstractIndexIndicatorDirective,
      useExisting: BasicIndexIndicatorComponent
    }
  ],
  template: `
    @for (i of numberArray; track i) {
      <div class="indicator" [class.selected]="i === currentIndex()"></div>
    }
  `,
  styles: [`
    * {
      margin: 0;
      padding: 0;
    }

    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .indicator {
      border-radius: 50%;
      background-color: var(--indicator-color);
      width: var(--indicator-size);
      height: var(--indicator-size);
      transform: scale(0.8);
    }

    .indicator.selected {
      transform: scale(1);
      background-color: var(--selected-indicator-color);
    }
  `]
})
export class BasicIndexIndicatorComponent extends AbstractIndexIndicatorDirective {
  @Input()
  size: string = '8px'
  @Input()
  gap: string = '5px'

  constructor() {
    super();
  }

  @HostBinding('style.gap')
  get gapStyle() {
    return this.gap
  }

  @HostBinding('style.--indicator-size')
  get indicatorSize() {
    return this.size
  }
}
