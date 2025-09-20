import {AfterViewInit, Component, ElementRef, HostBinding, inject, ViewChild} from '@angular/core';
import gsap from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {SplitText} from "gsap/SplitText";
import {MobileEvaluationService} from "../utils/mobile-evaluation.service";

@Component({
  selector: 'education',
  standalone: true,
  imports: [],
  template: `
    <div #content class="content">
      <h1 #header>Education</h1>
      <div #timeline>
        <div class="grid">
          <div class="milestone">
            <span>09/2021 - 07/2024</span>
            <span>Bachelor Computer Science<br>Zurich University of Applied Science</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 0 9 12 16 22 10.1667V17.5H24V9L12 2ZM3.99902 13.4905V18.0001C5.82344 20.429 8.72812 22.0001 11.9998 22.0001 15.2714 22.0001 18.1761 20.429 20.0005 18.0001L20.0001 13.4913 12.0003 18.1579 3.99902 13.4905Z"></path></svg>
        </div>
        <div class="grid">
          <div class="milestone">
            <span>09/2020 - 02/2021</span>
            <span>Bachelor Energy and Environmental Engineering<br>Zurich University of Applied Science (1 Semester)</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 0 9 12 16 22 10.1667V17.5H24V9L12 2ZM3.99902 13.4905V18.0001C5.82344 20.429 8.72812 22.0001 11.9998 22.0001 15.2714 22.0001 18.1761 20.429 20.0005 18.0001L20.0001 13.4913 12.0003 18.1579 3.99902 13.4905Z"></path></svg>
        </div>
        <div class="grid">
          <div class="milestone">
            <span>07/2017 - 05/2018</span>
            <span>Sergeant Swiss Armed Forces</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 186.9">
            <path d="M150.69,43.42c0-15.53,6.88-18.24,9.14-19.13l2.86-1.13-.25-9.44-2.62-1.1C152.74,9.66,126.27,0,82.92,0S13.1,9.66,6,12.62L3.4,13.72l-.25,9.44L6,24.29c2.25.89,9.13,3.6,9.13,19.13A20.31,20.31,0,0,1,2.92,62.08L0,63.34l.44,5.14C1.27,78.72,3,100,13.75,122.88c13.35,28.41,36,49.69,67.42,63.26l1.75.76,1.75-.76c31.39-13.57,54.08-34.85,67.42-63.26,10.74-22.87,12.48-44.16,13.31-54.4l.44-5.14-2.92-1.26A20.31,20.31,0,0,1,150.69,43.42ZM82.92,177.27C16.78,147.7,11,89.39,9.32,68.73A29.13,29.13,0,0,0,24,43.42c0-8.27-1.82-18.6-9.65-24.52C25,15.16,48.2,8.83,82.92,8.83s57.93,6.33,68.6,10.07c-7.84,5.92-9.65,16.25-9.65,24.52a29.14,29.14,0,0,0,14.65,25.31C154.82,89.39,149.06,147.7,82.92,177.27ZM97,38.72H68.85V71.56H36V99.71H68.85v32.84H97V99.71h32.84V71.56H97Z"/>
          </svg>
        </div>
        <div class="grid">
          <div class="milestone">
            <span>02/2015 - 02/2016</span>
            <span>Berufsmaturität</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z"></path></svg>
        </div>
        <div class="grid">
          <div class="milestone">
            <span>08/2011 - 09/2014</span>
            <span>Apprenticeship male nurse EFZ</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 20H23V22H1V20H3V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V20ZM11 8H9V10H11V12H13V10H15V8H13V6H11V8ZM14 20H16V14H8V20H10V16H14V20Z"></path></svg>
        </div>
        <div class="grid">
          <div class="milestone">
            <span>08/2001 - 07/2011</span>
            <span>Compulsory schooling</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 11.3333L0 9L12 2L24 9V17.5H22V10.1667L20 11.3333V18.0113L19.7774 18.2864C17.9457 20.5499 15.1418 22 12 22C8.85817 22 6.05429 20.5499 4.22263 18.2864L4 18.0113V11.3333ZM6 12.5V17.2917C7.46721 18.954 9.61112 20 12 20C14.3889 20 16.5328 18.954 18 17.2917V12.5L12 16L6 12.5ZM3.96927 9L12 13.6846L20.0307 9L12 4.31541L3.96927 9Z"></path></svg>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100vw;
      min-height: 100vh;
    }

    .content {
      position: relative;
      height: fit-content;
      margin-top: var(--content-top);
      display: grid;
      justify-items: center;
      align-items: center;
      margin-bottom: var(--margin-xl);
    }

    h1 {
      font-size: 2rem;
      color: var(--color-font-bright);
      letter-spacing: var(--letter-spacing-header);
      margin-bottom: var(--margin-m);
    }

    .grid {
      position: relative;
      display: grid;
      align-items: center;
      width: 750px;
      min-height: 60px;
      grid-template-columns: 1fr 1fr;
    }
    .grid::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 1px;
      height: calc(50% - 14px);
      background: var(--color-font-bright);
    }
    .grid::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 1px;
      height: calc(50% - 14px);
      background: var(--color-font-bright);
    }

    .grid:nth-child(2n) .milestone {
      grid-column: 2 / span 1;
      justify-items: end;
      text-align: end;
    }

    .milestone {
      display: grid;
      grid-template-rows: auto 1fr;
    }

    .milestone > span:first-child {
      color: var(--color-font-dark);
      font-size: var(--font-size-xs);
    }
    .milestone > span:last-child {
      color: var(--color-font-bright);
      font-size: var(--font-size-s);
    }

    svg {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      height: 14px;
      width: fit-content;
    }
    path {
      fill: var(--color-font-bright);
    }

    @media (max-width: 768px) {
      .grid {
        position: relative;
        display: grid;
        align-items: center;
        justify-items: center;
        row-gap: var(--margin-s);
        width: 100vw;
        min-height: 60px;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
      }
      .grid::before, .grid::after {
        display: none;
      }

      .grid .milestone, .grid:nth-child(2n) .milestone {
        grid-column: 1 / span 1;
        justify-items: center;
        text-align: center;
      }

      .milestone {
        grid-template-rows: auto auto;
      }

      svg {
        position: relative;
        left: 0;
        top: 0;
        transform: none;
        grid-row: 1 / span 1;
      }
    }
  `]
})
export class EducationComponent implements AfterViewInit {

  private isMobile = inject(MobileEvaluationService).isMobil

  @ViewChild('content', { read: ElementRef })
  contentRef!: ElementRef
  @ViewChild('header', { read: ElementRef })
  headerRef!: ElementRef
  @ViewChild('timeline', { read: ElementRef })
  timelineRef!: ElementRef

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger, SplitText)
    gsap.from(this.headerRef.nativeElement, {
      fontSize: this.isMobile ? '4rem' : '6rem',
      scrollTrigger: {
        scrub: true,
        trigger: this.contentRef.nativeElement,
        start: `top 45%`,
        end: 'top 10%',
        toggleActions: 'play none reverse none',
      }
    })

    const grids = this.timelineRef.nativeElement.querySelectorAll('.grid') as HTMLElement[]
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.contentRef.nativeElement,
        start: `top 45%`,
        end: 'top 45%',
        toggleActions: 'play none reverse none',
      }
    })

    grids.forEach(grid => {
      tl.from(grid, {
        opacity: 0,
        y: 50,
      }, '<')

      const split = SplitText.create(grid.querySelector('.milestone > span:last-child'), { type: 'words', mask: 'words' })
      tl.from(split.words, {
        opacity: 0,
        y: 20,
        stagger: 0.1
      }, '>')
    })
  }

  @HostBinding('style.--content-top')
  get contentTopStyle() {
    return `${window.innerHeight * .35}px`
  }
}
