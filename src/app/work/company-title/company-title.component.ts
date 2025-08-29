import {Component, Input} from '@angular/core';

@Component({
  selector: 'company-title',
  standalone: true,
  imports: [],
  template: `
    <span>{{ backgroundLetter }}</span>
    <span>{{ name }}</span>
  `,
  styles: [`
    :host {
      position: relative;
      isolation: isolate;
    }

    span {
      line-height: 1;
      letter-spacing: var(--letter-spacing-header);
    }

    span:first-child {
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(-45%, -45%);
      z-index: -1;
      color: var(--color-font-dark);
      font-size: 80rem;
      font-weight: 900;
      opacity: .05;
    }

    span:last-child {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 0;
      color: var(--color-font-dark);
      font-size: 30rem;
      font-weight: 900;
      opacity: .08;
    }

    @media(max-width: 600px) {
      span:first-child {
        font-size: 40rem;
      }

      span:last-child {
        font-size: 15rem;
      }
    }
  `]
})
export class CompanyTitleComponent {
  @Input()
  name: string = ''
  @Input()
  backgroundLetter: string = ''
}
