import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  QueryList,
  signal,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {CompanyTitleComponent} from "./company-title/company-title.component";
import gsap from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {BasicIndexIndicatorComponent} from "../../../../../../library-workspace/dist/leo-ui-styles";
import {CompanyCardComponent} from "./company-card/company-card.component";

@Component({
  selector: 'work',
  standalone: true,
  imports: [
    CompanyTitleComponent,
    BasicIndexIndicatorComponent,
    CompanyCardComponent
  ],
  template: `
    <company-title #comTitle class="com-title" name="ergon" backgroundLetter="e"/>
    <company-title #comTitle class="com-title" name="ergon" backgroundLetter="e"/>
    <company-title #comTitle class="com-title" name="silias" backgroundLetter="s"/>
    <company-title #comTitle class="com-title" name="swiss" backgroundLetter="s"/>
    <company-title #comTitle class="com-title" name="medical" backgroundLetter="m"/>
    <company-card #comCard
                  class="com-card"
                  [data]="{
                  period: '01/25 - 07/25',
                  jobTitle: 'Fullstack Software Engineer Trainee',
                  pensum: '100',
                  location: 'Zurich',
                  hashtag: 'HealthTech',
                  company: { name: 'ergon', url: 'https://www.ergon.ch'},
                  imageUrl: 'image/axenita.png',
                  techStack: ['Angular', 'JaxRs', 'Webpack', 'Gradle', 'Java', 'JUnit', 'Typescript', 'OpenAPI', 'Git'],
                  description: [
                  'Taking the lead in planning and implementing code generation solution. Result is a binary gradle plugin that uses java reflexion',
                  'Implementing features, bug-fixing and optimizations for leading healthcare application on the swiss market']
                  }"
    />
    <company-card #comCard
                  class="com-card"
                  [data]="{
                  period: '07/24 - 01/24',
                  jobTitle: 'Fullstack Software Engineer Trainee',
                  pensum: '100',
                  location: 'Zurich',
                  hashtag: 'FinTech',
                  company: { name: 'ergon', url: 'https://www.ergon.ch'},
                  imageUrl: 'image/viac.png',
                  techStack: ['Angular', 'JaxRs', 'Kotlin', 'JUnit', 'Jasmine', 'Typescript', 'Git', 'CSS', 'SQL'],
                  description: [
                  'Developing and migrating admin dashboard',
                  'Implementing and designing reusable frontend components',
                  'Contribute to award winning fintech application',
                  'Requirements engineering with our client',
                  'Cooperate with QA'
                  ]
                  }"
    />
    <company-card #comCard
                  class="com-card"
                  [data]="{
                  period: '07/23 - 12/23',
                  jobTitle: 'Fullstack Web Developer',
                  pensum: '20',
                  location: 'Zurich',
                  hashtag: 'EdTech',
                  company: { name: 'silias', url: 'https://www.silias.ch'},
                  imageUrl: 'image/silias.jpg',
                  techStack: ['NextJs', 'ExpressJs', 'Payment API', 'Typescript', 'Jasmine', 'SQL', 'CSS', 'Git'],
                  description: [
                  'Architecting and implementing a planning tool from scratch',
                  'Integrating an external payment api',
                  'Implementing and designing reusable frontend components in NextJs',
                  'Implementing a RestAPI in ExpressJS using typescript',
                  'Architecting and defining a read and write model for Postgresql and integrating Prisma for ORM',
                  'Requirements engineering with our client'
                  ]
                  }"
    />
    <company-card #comCard
                  class="com-card"
                  [data]="{
                  period: '01/19 - 08/20',
                  jobTitle: 'Cabin Crew Member',
                  pensum: '100',
                  location: 'Zurich',
                  hashtag: 'Aviation',
                  company: { name: 'swiss', url: 'https://www.swiss.com'},
                  imageUrl: 'image/swiss.jpg',
                  techStack: ['Customer Care', 'English', 'Flexibility', 'Go the extra mile', 'Cultures', 'Teamwork'],
                  description: [
                  'Working as a Cabin Crew Member at Swiss Intl Ltd I was able to fulfill a personal dream',
                  'Experiencing and interacting with different cultures',
                  'Being productive in an ever changing team with different personalities'
                  ]
                  }"
    />
    <company-card #comCard
                  class="com-card"
                  [data]="{
                  period: '08/11 - 08/21',
                  jobTitle: 'Various Jobs as a male nurse',
                  pensum: '100',
                  location: 'Switzerland',
                  hashtag: 'Healthcare',
                  company: { name: '-', url: '#'},
                  imageUrl: 'image/pflege.png',
                  techStack: ['Customer Care', 'Flexibility', 'Communication', 'Stress-resistance'],
                  description: [
                  'Working as a male nurse in hospitals as well as retirement homes',
                  'Learning many soft skills and dealing with difficult situations'
                  ]
                  }"
    />
    <leo-basic-index-indicator #idxIdc id="idx-idc" [numberOfSlides]="numOfSections" color="var(--color-font-dark-30)" selectedColor="var(--color-font-bright)"/>
  `,
  styles: [`
    :host {
      width: 100vw;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      background: radial-gradient(var(--color-background-primary) 5%, transparent 70%);
    }

    .com-title {
      position: absolute;
      left: -250%;
      top: 18%;
      opacity: 0;
    }

    .com-card {
      position: absolute;
      right: -100%;
      bottom: 0;
      opacity: 0;
    }

    #idx-idc {
      position: absolute;
      bottom: var(--margin-m);
      z-index: 1;
    }

    @media (max-width: 600px) {
      .com-card {
        top: calc(50px + 2* var(--margin-m));
      }
    }
  `]
})
export class WorkComponent implements AfterViewInit {

  private currentIdx = 0
  private targetIdx = signal<number>(0)
  private height: number = window.innerWidth > 600 ? 6000 : 3000
  protected numOfSections = 4
  private componentHeight = 0
  private sectionHeight = 0
  private currentTl?: any

  private el = inject(ElementRef)

  @ViewChildren('comTitle', { read: ElementRef })
  companyTitles!: QueryList<ElementRef>

  @ViewChildren('comCard', { read: ElementRef})
  companyCards!: QueryList<ElementRef>

  @ViewChild('idxIdc', { read: BasicIndexIndicatorComponent})
  idxIdc!: BasicIndexIndicatorComponent

  constructor() {
    effect(() => {
      const newIdx = this.targetIdx()
      const currentTitle = this.companyTitles.get(this.currentIdx)
      const targetTitle = this.companyTitles.get(newIdx)
      const currentCard = this.companyCards.get(this.currentIdx)
      const targetCard = this.companyCards.get(newIdx)
      if (currentTitle && targetTitle && currentCard && targetCard) {
        if (this.currentTl) {
          this.clearTimeline()
          currentTitle.nativeElement.style.left = `${window.innerWidth + 200}px`
          currentTitle.nativeElement.style.opacity = '0'
          targetTitle.nativeElement.style.left = '-250%'
          targetTitle.nativeElement.style.opacity = '0'
          currentCard.nativeElement.style.right = '100%'
          currentCard.nativeElement.style.opacity = '0'
          targetCard.nativeElement.style.opacity = '0'
        }
        this.currentTl = gsap.timeline({
          onComplete: () => { this.currentTl = undefined }
        })
          .to(currentTitle.nativeElement, {
            left: window.innerWidth + 200,
            opacity: 0,
            duration: .8,
            onComplete: () => {currentTitle.nativeElement.style.left = '-250%'}
          }, '<')
          .to(currentCard.nativeElement, {
            right: '100%',
            opacity: 0,
            duration: .8,
            onComplete: () => {currentCard.nativeElement.style.right = '-100%'}
          },'<')
          .to(targetTitle.nativeElement, {
            left: window.innerWidth * .15,
            opacity: 1,
            duration: .8,
          }, '>')
          .to(targetCard.nativeElement, {
            right: '0%',
            opacity: 1,
            duration: .8,
          }, '<')
        this.currentIdx = newIdx
      }
    })
  }

  ngAfterViewInit(): void {
    this.setupScrollSectionTracking()
  }

  private setupScrollSectionTracking() {
    this.numOfSections = this.companyTitles.length
    this.componentHeight = this.el.nativeElement.clientHeight + this.height
    this.sectionHeight = this.componentHeight / this.numOfSections
    gsap.registerPlugin(ScrollTrigger)
    gsap.to(this.el.nativeElement, {
      scrollTrigger: {
        trigger: this.el.nativeElement,
        pin: true,
        pinSpacing: true,
        start: 'top top',
        end: `+=${this.height}`,
        onUpdate: (self) => {
          const progress = self.progress
          const newIdx = Math.min(Math.floor(this.componentHeight * progress / this.sectionHeight), this.numOfSections - 1)
          if (newIdx !== this.currentIdx) {
            this.idxIdc.currentIndex.set(newIdx)
            this.targetIdx.set(newIdx)
          }
        }
      }
    })
  }

  private clearTimeline() {
    this.currentTl.kill()
    this.currentTl = undefined
    this.companyTitles.forEach(title => {title.nativeElement.style.left = '-250%'; title.nativeElement.style.opacity = '0' })
    this.companyCards.forEach(card => { card.nativeElement.style.right = '-100%'; card.nativeElement.style.opacity = '0' })
  }

}
