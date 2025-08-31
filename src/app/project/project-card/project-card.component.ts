import {Component, ElementRef, HostListener, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ProjectCategory} from "../project.component";

export interface ProjectCardData {
  title: string,
  techStack: string[],
  description: string,
  imgUrl: string,
  keywords: ProjectCategory[]
  link?: string,
}

@Component({
  selector: 'project-card',
  standalone: true,
  imports: [],
  template: `
    <div class="img-container">
      <img src="{{data.imgUrl}}" alt="" fill>
    </div>
    <h2>{{ data.title }}</h2>
    <div class="tech-stack">
      @for (skill of data.techStack; track skill) {
        <span>{{ skill }}</span>
      }
    </div>
    <div class="description">
      <p [innerHTML]="data.description"></p>
    </div>
    @if (data.link) {
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
           class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>
      </svg>

    }
  `,
  styles: [`
    :host {
      position: relative;
      display: grid;
      grid-template-columns: 180px 1fr;
      grid-template-rows: auto auto 1fr;
      column-gap: var(--margin-s);
      max-width: 700px;
      padding: var(--margin-s);
      border-radius: 5px;
      border: 1px solid transparent;
      background: linear-gradient(var(--color-background-secondary) var(--highlight-percentage), var(--color-background-primary)) padding-box,
      linear-gradient(0deg, var(--accent-70) 0%, var(--color-background-tertiary) var(--accent-percentage)) border-box;
      cursor: pointer;
      transition: --accent-percentage .5s ease;
    }

    :host:hover {
      --accent-percentage: 80%;
      --highlight-percentage: 50%
    }

    :host.highlight {
      --accent-percentage: 80%;
      --highlight-percentage: 50%
    }

    h2 {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
      color: var(--color-font-bright);
      font-size: var(--font-size-l);
      letter-spacing: var(--letter-spacing-header);
    }

    .img-container {
      position: relative;
      width: 180px;
      height: 100px;
      grid-column: 1 / span 1;
      grid-row: 1 / span 2;
      border-radius: 5px;
      align-self: start;
    }

    .img-container > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      border-radius: inherit;
    }

    h2 {
      color: var(--color-font-bright);
      font-size: var(--font-size-m);
      letter-spacing: var(--letter-spacing-header);
      align-self: start;
      justify-self: start;
    }

    .tech-stack {
      max-width: 280px;
      grid-column: 2 / span 1;
      grid-row: 2 / span 1;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      align-items: center;
      align-self: start;
    }

    .tech-stack > span {
      color: var(--color-font-dark);
      font-size: var(--font-size-xs);
      padding-inline: var(--margin-xs);
      position: relative;
    }

    .tech-stack > span::before {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--accent);
      opacity: .6;
    }

    .description {
      grid-column: 1 / span 2;
      grid-row: 3 / span 1;
      margin-top: var(--margin-m);
    }

    .description > p {
      color: var(--color-font-dark);
      font-size: var(--font-size-xs);
      line-height: calc(var(--line-height-para-ratio) * var(--font-size-xs));
    }

    svg {
      width: 16px;
      height: 16px;
      color: var(--color-font-dark-30);
      position: absolute;
      right: var(--margin-s);
      top: var(--margin-s);
    }

    :host.highlight svg {
      color: var(--accent);
    }

    @property --accent-percentage {
      syntax: "<percentage>";
      inherits: false;
      initial-value: 20%;
    }

    @property --highlight-percentage {
      syntax: "<percentage>";
      inherits: false;
      initial-value: 0%;
    }

    @media (max-width: 600px) {
      :host {
        width: 95vw;
        align-self: center;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto auto;
      }

      h2 {
        grid-column: 1 / span 1;
        grid-row: 2 / span 1;
        margin-bottom: var(--margin-xs);
      }

      .img-container {
        grid-column: 1 / span 1;
        grid-row: 1 / span 1;
        margin-bottom: var(--margin-s);
        justify-self: center;
      }

      .tech-stack {
        grid-column: 1 / span 1;
        grid-row: 3 / span 1;
      }

      .description {
        grid-column: 1 / span 1;
        grid-row: 4 / span 1;
        margin-top: var(--margin-s);
      }
    }
  `]
})
export class ProjectCardComponent implements OnChanges {
  @Input({ required: true })
  data!: ProjectCardData

  @Input()
  search?: ProjectCategory

  private el = inject(ElementRef)

  @HostListener('click')
  onClick() {
    if (this.data.link) {
      window.open(this.data.link, '_blank')
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const newValue = changes['search']?.currentValue
    if (newValue && this.data.keywords.includes(newValue)) {
      this.el.nativeElement.classList.add('highlight')
    } else {
      this.el.nativeElement.classList.remove('highlight')
    }
  }
}
