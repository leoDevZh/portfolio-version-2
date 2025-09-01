import {Component, ElementRef, HostBinding, inject, Input, OnInit} from '@angular/core';
import {MouseFollowerDirective} from "./mouse-follower.directive";

@Component({
  selector: 'leo-square-boarder-mouse-follower',
  standalone: true,
  imports: [
    MouseFollowerDirective
  ],
  template: `
    <div class="grid">
      @for (square of squares; track $index) {
        <div class="square"></div>
      }
    </div>
    <div class="background"></div>
    <div leoMouseFollower [speed]="speed" [useClient]="true" [initialPosition]="initialPosition" class="follower"></div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
      position: sticky;
      left: 0;
      top: 0;
      z-index: -5;
      overflow: hidden;
    }

    .grid {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      display: grid;
      grid-template-columns: repeat(var(--number-of-squares), 1fr);
      gap: var(--gap);
    }

    .background {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: -7;
      background-color: var(--background-color);
    }

    .square {
      aspect-ratio: 1/1;
      background-color: var(--background-color);
    }

    .follower {
      display: block;
      z-index: -6;
      width: var(--gradient-width);
      height: var(--gradient-width);
      background: var(--radial-gradient);
      transform: translate(-50%, -50%);
    }
  `]
})
export class SquareBoarderMouseFollowerComponent implements OnInit {
  @Input()
  numberOfSquares: number = 25
  @Input()
  boarderWidth: string = '1px'
  @Input()
  boarderColorHex: string = '#ffffff'
  @Input()
  squareBackgroundColor: string = '#020002'
  @Input()
  gradientWidth: string = '10vw'
  @Input()
  speed: number = .1
  @Input()
  initialPosition: {x: number, y: number} = {x: 0, y: 0}

  protected squares: number[] = []

  protected el = inject(ElementRef)

  ngOnInit() {
    this.generateSquares();
  }

  private generateSquares() {
    let total = this.numberOfSquares ** 2
    const hwr = window.innerHeight / window.innerWidth
    if (hwr > 1) {
      total = Math.round(hwr * total)
    }
    this.squares = Array.from({ length: total }, (_, i) => i)
  }

  @HostBinding('style.--number-of-squares')
  get numberOfSquaresStyle() {
    return this.numberOfSquares
  }

  @HostBinding('style.--gap')
  get gapStyle() {
    return this.boarderWidth
  }

  @HostBinding('style.--background-color')
  get backgroundColorStyle() {
    return this.squareBackgroundColor
  }

  @HostBinding('style.--radial-gradient')
  get boarderColorStyle() {
    return `radial-gradient(
        circle at center,
        ${this.boarderColorHex}ff 0px,
        ${this.boarderColorHex}ff 15%,
        ${this.boarderColorHex}26 35%,
        ${this.boarderColorHex}05 70%,
        ${this.boarderColorHex}00 100%
      )`
  }

  @HostBinding('style.--gradient-width')
  get gradientWidthStyle() {
    return this.gradientWidth
  }
}
