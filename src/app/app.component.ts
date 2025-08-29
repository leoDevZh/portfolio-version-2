import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {PageProgressComponent} from "./nav/progress-indicator/page-progress.component";
import {HeroComponent} from "./hero/hero.component";
import {ConnectionComponent} from "./connection/connection.component";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {WorkComponent} from "./work/work.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PageProgressComponent, HeroComponent, ConnectionComponent, WorkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {

  @ViewChild('prog', { read: PageProgressComponent})
  prog!: PageProgressComponent

  @ViewChild('conRef', { read: ConnectionComponent })
  con!: ConnectionComponent

  @ViewChild('hero', { read: ElementRef })
  heroRef!: ElementRef

  @ViewChild('work', { read: ElementRef })
  workRef!: ElementRef

  @ViewChild('conTrigger', { read: ElementRef })
  conTrigger!: ElementRef

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger)
    // init avatar animation
    gsap.to(this.conTrigger.nativeElement, {
      scrollTrigger: {
        trigger: this.conTrigger.nativeElement,
        start: 'top top',
        end: 'top top',
        onEnter: () => this.con.playForward(),
        onEnterBack: () => this.con.playBackward()
      }
    })

    // init progress bar animation
    gsap.to(this.heroRef.nativeElement, {
      scrollTrigger: {
        trigger: this.heroRef.nativeElement,
        start: 'top 10%',
        end: 'bottom 75%',
        onEnter: () => this.prog.slideToIndex(0),
        onEnterBack: () => this.prog.slideToIndex(0)
      }
    })

    gsap.to(this.workRef.nativeElement, {
      scrollTrigger: {
        trigger: this.workRef.nativeElement,
        start: 'top 10%',
        end: 'bottom 75%',
        onEnter: () => this.prog.slideToIndex(1),
        onEnterBack: () => this.prog.slideToIndex(1)
      }
    })
  }

  onAvatarAnimationComplete() {
  }
}
