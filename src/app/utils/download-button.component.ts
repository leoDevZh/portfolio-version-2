import {Component, ElementRef, HostBinding, inject, Input, ViewChild} from '@angular/core';
import {SvgMorphAnimatorComponent} from "./svg-morph-animator.component";

@Component({
  selector: 'leo-download-button',
  standalone: true,
  imports: [
    SvgMorphAnimatorComponent
  ],
  template: `
    <button>
      <leo-svg-morph-animator class="morph" #morph triggerMode="manual" [duration]=".2">
        <svg start xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        <svg end xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </leo-svg-morph-animator>
      <span>{{ text }}</span>
    </button>

  `,
  styles: [`
    :host {
      border: 1px solid rgba(2, 0, 2, 0.1);
      padding: 5px;
      border-radius: 5px;
      background-image: linear-gradient(#fff 75%, rgba(2, 0, 2, 0.05));
      transition: all .2s ease;
      cursor: pointer;
    }

    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: none;
      outline: none;
      padding: 0;
      margin: 0;
      cursor: inherit;
      color: inherit;
      font-size: inherit;
      font-family: inherit;
    }

    span {
      margin-left: 5px;
    }

    .morph {
      width: var(--icon-size);
      color: var(--icon-color);
    }
  `]
})
export class DownloadButtonComponent {
  @Input()
  text?: string
  @Input()
  iconSize: string = '20px'
  @Input()
  iconColor: string = 'inherit'

  private el = inject(ElementRef)

  @ViewChild('morph', {static: true})
  morphRef!: SvgMorphAnimatorComponent

  constructor() {
    this.el.nativeElement.addEventListener('click', () => this.onClick())
  }

  private onClick() {
    this.morphRef.play()
  }

  @HostBinding('style.--icon-size')
  get iconSizeStyle() {
    return this.iconSize
  }

  @HostBinding('style.--icon-color')
  get iconColorStyle() {
    return this.iconColor
  }
}
