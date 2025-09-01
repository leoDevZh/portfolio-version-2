import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import gsap from "gsap";

@Component({
  selector: 'leo-scramble-text',
  standalone: true,
  imports: [],
  template: `<div #textWrapper><ng-content></ng-content></div>`,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class TextScrambleComponent implements AfterViewInit, OnDestroy{
  @Input()
  triggerMode: 'scroll' | 'manual' | 'timeline' = 'scroll'
  @Input({required: true})
  text!: string
  @Input()
  chars: string = 'upperAndLowerCase'
  @Input()
  duration: number = 1
  @Input()
  tweenLength: boolean = true
  @Input()
  revealDelay: number = 0
  @Input()
  newClass: string = ''
  @Input()
  oldClass: string = ''
  @Input()
  speed: number = 1
  @Input()
  delimiter: string = ''
  @Input()
  rightToLeft: boolean = false

  @Input()
  scroller: ElementRef | null = null
  @Input()
  horizontal: boolean = false
  @Input()
  trigger: ElementRef | null = null
  @Input()
  scrub: boolean | number = false
  @Input()
  pin: boolean = false
  @Input()
  pinSpacing: boolean = true
  @Input()
  scrollTriggerStart: string = 'top 25%'
  @Input()
  scrollTriggerEnd?: string
  @Input()
  toggleAction: string = 'play none none none'
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

  @ViewChild('textWrapper', { static: true }) textWrapper!: ElementRef;

  private animationInstance?: any;
  private useFrom: boolean = false

  tweenVars!: gsap.TweenVars
  get el() {
    return this.textWrapper
  }

  ngAfterViewInit(): void {
    this.initTweenVars()
    this.useFrom = false
    if (this.triggerMode !== 'timeline') {
      this.createAnimationInstance()
    }
  }

  private initTweenVars() {
    gsap.registerPlugin(ScrambleTextPlugin)

    const toVars: gsap.TweenVars = {
      paused: this.triggerMode === 'manual',
      duration: this.duration,
      onStart: () => this.animationStart.emit(),
      onUpdate: () => this.animationUpdate.emit(this.animationInstance),
      onRepeat: () => this.animationRepeat.emit(),
      onReverseComplete: () => this.animationReverseComplete.emit(),
      onComplete: () => this.animationComplete.emit(),
      scrambleText: {
        text: this.text,
        chars: this.chars,
        tweenLength: this.tweenLength,
        revealDelay: this.revealDelay,
        speed: this.speed,
        newClass: this.newClass,
        oldClass: this.oldClass,
        delimiter: this.delimiter,
        rightToLeft: this.rightToLeft
      }
    }

    if (this.triggerMode === 'scroll') {
      gsap.registerPlugin(ScrollTrigger)
      toVars.scrollTrigger = {
        horizontal: this.horizontal,
        scroller: this.scroller?.nativeElement ?? undefined,
        trigger: this.trigger?.nativeElement ?? this.textWrapper.nativeElement,
        pin: this.pin,
        pinSpacing: this.pinSpacing,
        start: this.scrollTriggerStart,
        end: this.scrollTriggerEnd,
        toggleActions: this.toggleAction,
        scrub: this.scrub,
        markers: this.markers
      }
    }

    this.tweenVars = toVars
  }

  private createAnimationInstance() {
    this.animationInstance = gsap.to(this.textWrapper.nativeElement, this.tweenVars)
  }

  play() { this.animationInstance?.play() }
  pause() { this.animationInstance?.pause() }
  reverse() { this.animationInstance?.reverse() }
  restart() { this.animationInstance?.restart() }

  ngOnDestroy() {
    this.animationInstance?.kill()
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }
}
