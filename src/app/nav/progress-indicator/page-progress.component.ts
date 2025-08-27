import {AfterViewInit, Component, QueryList, ViewChildren} from "@angular/core";
import {ProgressIndicatorRopeComponent} from "./progress-indicator-rope.component";

@Component({
  selector: 'page-progress',
  standalone: true,
  imports: [
    ProgressIndicatorRopeComponent
  ],
  template: `
    <span [class.active]="textAnimationIdx === 0">Home</span>
    <span [class.active]="textAnimationIdx === 1">Work</span>
    <span [class.active]="textAnimationIdx === 2">Projects</span>
    <span [class.active]="textAnimationIdx === 3">Education</span>
    <div class="rope-container">
      <progress-indicator-rope
        class="idc"
        (onComplete)="complete()"
        displayConnector="LEFT"
        [ballColor]="'var(--color-font-bright)'"
        [ropeColor]="'var(--color-font-dark)'"
        [speed]="2"
        [strokeWidth]="6"
        [ballRadius]="18"
        [keepBallSize]="true"
      />
      <progress-indicator-rope
        class="idc"
        (onComplete)="complete()"
        displayConnector="BOTH"
        [ballColor]="'var(--color-font-bright)'"
        [ropeColor]="'var(--color-font-dark)'"
        [speed]="2"
        [strokeWidth]="6"
        [ballRadius]="18"
        [keepBallSize]="true"
      />
      <progress-indicator-rope
        class="idc"
        (onComplete)="complete()"
        displayConnector="BOTH"
        [ballColor]="'var(--color-font-bright)'"
        [ropeColor]="'var(--color-font-dark)'"
        [speed]="2"
        [strokeWidth]="6"
        [ballRadius]="18"
        [keepBallSize]="true"
      />
    </div>
  `,
  styles: [`
    :host {
      position: relative;
      width: 30vw;
      height: 50px;
    }

    span {
      position: absolute;
      font-size: var(--font-size-xs);
      color: var(--color-font-dark);
      transform: translateX(-50%);
      transition: all .2s ease;
      transition-delay: .6s;
    }

    span:nth-child(2) {
      left: 33%;
    }

    span:nth-child(3) {
      left: 66%;
    }

    span:nth-child(4) {
      left: 100%;
    }

    span.active {
      color: var(--color-font-bright);
      font-weight: bold;
    }

    .rope-container {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: row;
    }

    .idc {
      width: 33.33%;
    }

    @media (max-width: 600px) {
      :host {
        width: 60vw;
      }
    }
  `]
})
export class PageProgressComponent implements AfterViewInit{

  private currentIdx = 0
  private animationInProgress = false
  protected textAnimationIdx = 0

  @ViewChildren(ProgressIndicatorRopeComponent)
  ropes!: QueryList<ProgressIndicatorRopeComponent>;

  ngAfterViewInit() {
    this.ropes.get(1)?.shrinkBall()
    this.ropes.get(2)?.shrinkBall()
  }

  slideForward() {
    if (this.currentIdx === (this.ropes.length - 1) || this.animationInProgress) return
    if (this.currentIdx > 0) {
      this.ropes.get(this.currentIdx)?.expandBall()
      this.ropes.get(this.currentIdx - 1)?.shrinkBall()
    }
    this.animationInProgress = true
    const cur = this.ropes.get(this.currentIdx)
    cur?.startAnimation()
    this.currentIdx += 1
    this.textAnimationIdx = this.currentIdx
  }

  slideBackward() {
    if (this.currentIdx === 0 || this.animationInProgress) return
    this.animationInProgress = true
    this.currentIdx -= 1
    const cur = this.ropes.get(this.currentIdx)
    cur?.startAnimationReverse()
    this.textAnimationIdx = this.currentIdx
  }

  complete() {
    this.animationInProgress = false
  }
}
