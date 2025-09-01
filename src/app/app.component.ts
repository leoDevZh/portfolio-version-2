import {AfterViewInit, Component, ElementRef, HostListener, inject, ViewChild} from '@angular/core';
import {PageProgressComponent} from "./nav/progress-indicator/page-progress.component";
import {HeroComponent} from "./hero/hero.component";
import {ConnectionComponent} from "./connection/connection.component";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {WorkComponent} from "./work/work.component";
import {ProjectComponent} from "./project/project.component";
import {EducationComponent} from "./education/education.component";
import {FooterComponent} from "./footer/footer.component";
import {MobileEvaluationService} from "./utils/mobile-evaluation.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PageProgressComponent, HeroComponent, ConnectionComponent, WorkComponent, ProjectComponent, EducationComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {

  private mobileService = inject(MobileEvaluationService)
  private el = inject(ElementRef)

  @ViewChild('prog', { read: PageProgressComponent})
  prog!: PageProgressComponent

  @ViewChild('conRef', { read: ConnectionComponent })
  con!: ConnectionComponent

  @ViewChild('conTrigger', { read: ElementRef })
  conTrigger!: ElementRef

  @ViewChild('hero', { read: ElementRef })
  heroRef!: ElementRef

  @ViewChild('work', { read: ElementRef })
  workRef!: ElementRef

  @ViewChild('project', { read: ElementRef })
  projectRef!: ElementRef

  @ViewChild('edu', { read: ElementRef })
  eduRef!: ElementRef

  ngAfterViewInit() {
    if (this.mobileService.isMobil) {
      this.el.nativeElement.classList.add('mobil')
    }

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

    gsap.to(this.projectRef.nativeElement, {
      scrollTrigger: {
        trigger: this.projectRef.nativeElement,
        start: 'top 25%',
        end: 'bottom 75%',
        onEnter: () => this.prog.slideToIndex(2),
        onEnterBack: () => this.prog.slideToIndex(2),
        onLeaveBack: () => this.prog.slideToIndex(1)
      }
    })

    gsap.to(this.eduRef.nativeElement, {
      scrollTrigger: {
        trigger: this.eduRef.nativeElement,
        start: 'top 20%',
        end: 'bottom 75%',
        onEnter: () => this.prog.slideToIndex(3),
        onEnterBack: () => this.prog.slideToIndex(3)
      }
    })
  }

  @HostListener('window:resize')
  onResize() {
    if (this.mobileService.isMobil) {
      this.el.nativeElement.classList.add('mobil')
    } else {
      this.el.nativeElement.classList.remove('mobil')
    }
  }
}
