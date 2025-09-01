import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import gsap from "gsap";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";

@Component({
  selector: 'leo-svg-morph-animator',
  standalone: true,
  template: `
    <div #start class="start">
      <ng-content select="[start]"/>
    </div>
    <div #end class="end">
        <ng-content select="[end]"/>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .end {
      display: none;
    }
  `]
})
export class SvgMorphAnimatorComponent implements AfterViewInit, OnDestroy {
  @Input()
  triggerMode: 'scroll' | 'manual' | 'timeline' = 'scroll'
  @Input()
  duration: number = .5
  @Input()
  ease: string = 'none'
  @Input()
  type: 'linear' | 'rotational' = 'linear'
  @Input()
  shapeIdx: number | 'auto' = 'auto'
  @Input()
  map?: 'size' | 'position' | 'complexity' | undefined

  @Input()
  scroller: ElementRef | null = null
  @Input()
  trigger: ElementRef | null = null
  @Input()
  scrub: boolean | number = false
  @Input()
  pin: boolean = false
  @Input()
  pinSpacing: boolean = true
  @Input()
  scrollTriggerStart: string = 'top center'
  @Input()
  scrollTriggerEnd?: string
  @Input()
  toggleAction: string = 'play none none none'
  @Input()
  horizontal: boolean = false
  @Input()
  markers: boolean = false

  @Output()
  animationStart = new EventEmitter<void>()
  @Output()
  animationUpdate = new EventEmitter<any>()
  @Output()
  animationRepeat = new EventEmitter<void>()
  @Output()
  animationReverseComplete = new EventEmitter<void>()
  @Output()
  animationComplete = new EventEmitter<void>()

  private hostEl = inject(ElementRef)

  @ViewChild('start', { read: ElementRef })
  startEl!: ElementRef<HTMLDivElement>;
  @ViewChild('end', { read: ElementRef })
  endEl!: ElementRef<HTMLDivElement>;

  private startPath!: any
  private endPath!: any
  private animationInstance?: any
  private useFrom = false
  tweenVars!: gsap.TweenVars

  get el() {
    return this.startPath
  }

  ngAfterViewInit() {
    gsap.registerPlugin(MorphSVGPlugin)
    this.initPathVariables()
    this.initTweenVars()
    if (this.triggerMode !== 'timeline') {
      this.createAnimationInstance()
    }
  }

  private initPathVariables() {
    this.startPath = this.startEl.nativeElement.querySelector('path')
    this.endPath = this.endEl.nativeElement.querySelector('path')
  }

  private initTweenVars() {
    const animationConfig: gsap.TweenVars = {
      paused: this.triggerMode === 'manual',
      duration: this.duration,
      ease: this.ease,
      morphSVG: {
        shape: this.endPath,
        type: this.type,
        shapeIndex: this.shapeIdx,
        map: this.map,

      },
      onStart: () => this.animationStart.emit(),
      onUpdate: () => this.animationUpdate.emit(this.animationInstance),
      onRepeat: () => this.animationRepeat.emit(),
      onReverseComplete: () => this.animationReverseComplete.emit(),
      onComplete: () => this.animationComplete.emit(),
    }

    if (this.triggerMode === 'scroll') {
      gsap.registerPlugin(ScrollTrigger)

      animationConfig.scrollTrigger = {
        horizontal: this.horizontal,
        scroller: this.scroller?.nativeElement ?? undefined,
        trigger: this.trigger?.nativeElement ?? this.hostEl.nativeElement,
        pin: this.pin,
        pinSpacing: this.pinSpacing,
        start: this.scrollTriggerStart,
        end: this.scrollTriggerEnd,
        toggleActions: this.toggleAction,
        scrub: this.scrub,
        markers: this.markers
      }
    }

    this.tweenVars = animationConfig
  }

  private createAnimationInstance() {
    this.animationInstance = gsap.to(this.startPath, this.tweenVars)
  }

  play() {
    this.animationInstance?.play()
  }
  pause() {
    this.animationInstance?.pause()
  }
  reverse() {
    this.animationInstance?.reverse()
  }
  restart() {
    this.animationInstance?.restart()
  }
  seek(time: number) {
    this.animationInstance?.seek(time)
  }

  ngOnDestroy() {
    if (this.animationInstance) {
      this.animationInstance.kill()
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }
}
