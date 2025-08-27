import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import gsap from 'gsap'

@Component({
  selector: 'progress-indicator-rope',
  standalone: true,
  imports: [],
  template: `
    <div class="rope-wrapper">
      <svg class="rope-layer" viewBox="0 0 600 200">
        <path #ropeRef class="rope" d="M 0 100 Q 300 100 600 100" />
      </svg>
      <svg class="ball-layer" viewBox="0 0 600 200">
        <circle #ballRef class="ball" r="0" cx="0" cy="100" />
      </svg>
      @if (displayConnector === 'LEFT' || displayConnector === 'BOTH') {
        <svg class="ball-layer" viewBox="0 0 600 200">
          <circle #conL class="ball" r="0" cx="0" cy="100" />
        </svg>
      }
      @if (displayConnector === 'RIGHT' || displayConnector === 'BOTH') {
        <svg class="ball-layer" viewBox="0 0 600 200">
          <circle #conR class="ball" r="0" cx="600" cy="100" />
        </svg>
      }
    </div>
  `,
  styles: [`
    :host {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
    }

    .rope-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .rope-layer,
    .ball-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .ball-layer {
      z-index: 2;
    }

    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }

    .rope {
      fill: none;
      stroke: var(--rope-color);
      stroke-width: var(--stroke-width);
    }

    .ball {
      fill: var(--ball-color);
    }
  `]
})
export class ProgressIndicatorRopeComponent implements AfterViewInit, OnDestroy {
  @Input()
  ropeColor: string = '#00f2ff'
  @Input()
  ballColor: string = '#ff3366'
  @Input()
  ballRadius: number = 12
  @Input()
  displayConnector: 'LEFT' | 'RIGHT' | 'BOTH' | 'NONE' = 'NONE'
  @Input()
  speed: number = 1
  @Input()
  strokeWidth: number = 4

  @Output()
  onComplete = new EventEmitter<void>()

  private t = 0
  private animationFrameId!: number

  @ViewChild('ballRef')
  ball!: ElementRef<SVGCircleElement>

  @ViewChild('ropeRef')
  rope!: ElementRef<SVGPathElement>

  @ViewChild('conL')
  conLeft?: ElementRef<SVGCircleElement>

  @ViewChild('conR')
  conRight?: ElementRef<SVGCircleElement>

  ngAfterViewInit() {
    this.conLeft?.nativeElement.setAttribute('r', (this.ballRadius / 2).toString())
    this.conRight?.nativeElement.setAttribute('r', (this.ballRadius / 2).toString())
  }

  startAnimation() {
    gsap.timeline()
      .to(this.ball.nativeElement, {
        duration: .5,
        attr: { r: this.ballRadius.toString() },
        ease: 'ease'
      })
      .to(this.rope.nativeElement, {
        duration: .08,
        attr: { d: 'M 0 100 Q 45 145 600 100' },
        ease: 'ease',
        onComplete: () => this.animate()
    }, '<+=.3')
  }

  private stopAnimation() {
    cancelAnimationFrame(this.animationFrameId)
    gsap.timeline()
      .to(this.rope.nativeElement, {
        duration: .5,
        attr: { d: 'M 0 100 Q 300 100 600 100' },
        ease: 'elastic.out(1, 0.3)'
      })
      .to(this.ball.nativeElement, {
        duration: .5,
        attr: { r: '0' },
        ease: 'ease',
        onComplete: () => this.onComplete.emit()
      }, '<')
  }

  private animate() {
    if (this.t > 1) {
      this.ball.nativeElement.setAttribute('cy', '100')
      this.stopAnimation()
      return
    }
    this.t += 0.018 * this.speed

    // Ball moves left → right
    const x =  Math.min(600 * (this.t), 600)
    const y = 100 + 20 * Math.sin((this.t) * Math.PI)
    this.ball.nativeElement.setAttribute('cx', x.toString())
    this.ball.nativeElement.setAttribute('cy', y.toString())

    // Update rope curve (control point follows ball with a sag effect)
    const controlX = x
    const controlY = y + 30 + this.ballRadius
    this.rope.nativeElement.setAttribute('d', `M 0 100 Q ${controlX} ${controlY} 600 100`)

    this.animationFrameId = requestAnimationFrame(() => this.animate())
  }

  ngOnDestroy(): void {
    this.stopAnimation()
  }

  @HostBinding('style.--rope-color')
  get ropeColorStyle() {
    return this.ropeColor
  }

  @HostBinding('style.--ball-color')
  get ballColorStyle() {
    return this.ballColor
  }

  @HostBinding('style.--connector-radius')
  get connectorRadiusStyle() {
    return `${this.ballRadius / 5}px`
  }

  @HostBinding('style.--stroke-width')
  get strokeWidthStyle() {
    return this.strokeWidth
  }
}
