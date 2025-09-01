import {AfterViewInit, Directive, ElementRef, HostListener, inject, Input, OnDestroy} from '@angular/core';

@Directive({
  selector: '[leoMouseFollower]',
  standalone: true
})
export class MouseFollowerDirective implements AfterViewInit, OnDestroy {

  @Input()
  speed: number = 0.1
  @Input()
  useClient: boolean = false
  @Input()
  initialPosition: {x: number, y: number} = {x: 0, y: 0}

  private el = inject(ElementRef)

  private mouseX = 0
  private mouseY = 0
  private posX = 0
  private posY = 0
  private animationFrameId!: number

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {

    this.mouseX = this.useClient ? event.clientX : event.pageX
    this.mouseY = this.useClient ? event.clientY : event.pageY
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.style.position = 'absolute'
    this.el.nativeElement.style.left = '0px'
    this.el.nativeElement.style.top = '0px'
    this.mouseX = this.initialPosition.x
    this.mouseY = this.initialPosition.y
    this.animate()
  }

  animate() {
    this.posX += (this.mouseX - this.posX) * this.speed
    this.posY += (this.mouseY - this.posY) * this.speed

    this.el.nativeElement.style.left = `${this.posX}px`
    this.el.nativeElement.style.top = `${this.posY}px`

    this.animationFrameId = requestAnimationFrame(() => this.animate())
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId)
  }
}
