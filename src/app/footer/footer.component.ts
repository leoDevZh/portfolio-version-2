import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer>
      <p>© 2025 Andrin Leo Fassbind</p>
      <p>Build and Designed by<br>Andrin Leo Fassbind</p>
    </footer>
  `,
  styles: [`
    :host {
      display: block;
      width: 100vw;
    }
    footer {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      width: 100%;
      height: 50px;
      color: var(--color-font-dark);
      font-size: var(--font-size-xs);
    }
  `]
})
export class FooterComponent {

}
