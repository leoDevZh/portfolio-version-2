import {AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, Output} from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'

@Component({
  selector: 'leo-element-animator',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ElementAnimatorComponent implements AfterViewInit, OnDestroy{
  @Input()
  triggerMode: 'scroll' | 'manual' | 'timeline' = 'scroll'
  @Input()
  animation: 'fade' | 'fade-out' | 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down' | 'scale-x' | 'scale-y' | 'scale' = 'fade'
  @Input()
  fromVars: object | null = null
  @Input()
  duration: number = 1
  @Input()
  offset: number = 50
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
  scrollTriggerStart: string = 'top 25%'
  @Input()
  scrollTriggerEnd?: string
  @Input()
  toggleAction: string = 'play none none none'
  @Input()
  ease: string = 'none'
  @Input()
  horizontal: boolean = false
  @Input()
  markers: boolean = false
  @Input()
  useFrom: boolean = true

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

  private animationInstance?: any
  el = inject(ElementRef)
  tweenVars!: gsap.TweenVars

  ngAfterViewInit() {
    this.initTweenVars()
    if (this.triggerMode !== 'timeline') {
      this.createAnimationInstance()
    }
  }

  private getFromVars(): gsap.TweenVars {
    let fromVars: gsap.TweenVars = {}
    switch (this.animation) {
      case 'fade':
        fromVars = { opacity: 0 }
        break
      case 'fade-out':
        fromVars = { opacity: 0 }
        this.useFrom = false
        break
      case 'slide-left':
        fromVars = { x: -1 * this.offset, opacity: 0 }
        break;
      case 'slide-right':
        fromVars = { x: this.offset, opacity: 0 }
        break
      case 'slide-up':
        fromVars = { y: this.offset, opacity: 0 }
        break
      case 'slide-down':
        fromVars = { y: -1 * this.offset, opacity: 0 }
        break
      case 'scale':
        fromVars = { scaleX: 0, scaleY: 0, opacity: 0 }
        break
      case 'scale-x':
        fromVars = { scaleX: 0, opacity: 0 }
        break
      case 'scale-y':
        fromVars = { scaleY: 0, opacity: 0 }
        break
    }

    return this.fromVars ?? fromVars
  }

  private initTweenVars() {
    const animationConfig: gsap.TweenVars = {
      ...this.getFromVars(),
      paused: this.triggerMode === 'manual',
      duration: this.duration,
      ease: this.ease,
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
        trigger: this.trigger?.nativeElement ?? this.el.nativeElement,
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
    if (this.useFrom) {
      this.animationInstance = gsap.from(this.el.nativeElement, this.tweenVars)
    } else {
      this.animationInstance = gsap.to(this.el.nativeElement, this.tweenVars)

    }
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
