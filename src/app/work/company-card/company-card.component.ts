import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

export interface CompanyCardData {
  period: string,
  jobTitle: string,
  pensum: string,
  location: string,
  hashtag: string,
  company: {name: string, url: string},
  imageUrl: string,
  techStack: string[],
  description: string[]
}

@Component({
  selector: 'company-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  template: `
    <div class="meta">
      <div class="period-container">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span>{{ data.period }}</span>
      </div>
      <h2>{{ data.jobTitle }}</h2>
      <div class="job-meta">
        <div>
          <span>{{ data.pensum }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5049 21.0027C15.5719 21.0027 14.0049 19.4357 14.0049 17.5027C14.0049 15.5697 15.5719 14.0027 17.5049 14.0027C19.4379 14.0027 21.0049 15.5697 21.0049 17.5027C21.0049 19.4357 19.4379 21.0027 17.5049 21.0027ZM17.5049 19.0027C18.3333 19.0027 19.0049 18.3312 19.0049 17.5027C19.0049 16.6743 18.3333 16.0027 17.5049 16.0027C16.6765 16.0027 16.0049 16.6743 16.0049 17.5027C16.0049 18.3312 16.6765 19.0027 17.5049 19.0027ZM6.50488 10.0027C4.57189 10.0027 3.00488 8.43574 3.00488 6.50275C3.00488 4.56975 4.57189 3.00275 6.50488 3.00275C8.43788 3.00275 10.0049 4.56975 10.0049 6.50275C10.0049 8.43574 8.43788 10.0027 6.50488 10.0027ZM6.50488 8.00275C7.33331 8.00275 8.00488 7.33117 8.00488 6.50275C8.00488 5.67432 7.33331 5.00275 6.50488 5.00275C5.67646 5.00275 5.00488 5.67432 5.00488 6.50275C5.00488 7.33117 5.67646 8.00275 6.50488 8.00275ZM19.076 3.51747L20.4902 4.93168L4.93382 20.488L3.5196 19.0738L19.076 3.51747Z"></path></svg>
        </div>
        <div>
          <span>{{ data.location }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path></svg>
        </div>
        <div>
          <span>{{ data.hashtag }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7.78428 14L8.2047 10H4V8H8.41491L8.94043 3H10.9514L10.4259 8H14.4149L14.9404 3H16.9514L16.4259 8H20V10H16.2157L15.7953 14H20V16H15.5851L15.0596 21H13.0486L13.5741 16H9.58509L9.05957 21H7.04855L7.57407 16H4V14H7.78428ZM9.7953 14H13.7843L14.2047 10H10.2157L9.7953 14Z"></path></svg>
        </div>
        <div>
          <span><a href="{{ data.company.url }}" target="_blank">{{ data.company.name }}</a></span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
          </svg>
        </div>
      </div>
    </div>
    <div class="tech-stack">
      <div class="inner-scroller">
        @for (skill of data.techStack; track skill) {
          <span>{{skill}}</span>
        }
        @for (skill of data.techStack; track skill) {
          <span>{{skill}}</span>
        }
      </div>
    </div>
    <ul class="job-desc">
      @for (liEl of data.description; track liEl) {
        <li>{{liEl}}</li>
      }
    </ul>
    <div class="image-container">
      <img ngSrc="{{ data.imageUrl }}" alt="" fill>
    </div>
  `,
  styles: [`
    :host {
      width: 100vw;
      height: calc(100vh - 50px - var(--margin-m));
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }

    .meta {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
      align-self: center;
      justify-self: center;
      margin-bottom: var(--margin-s);
    }

    .period-container, .job-meta {
      display: flex;
      align-items: center;
      font-size: var(--font-size-m);
      color: var(--color-font-dark);
      line-height: calc(var(--line-height-para-ratio) * var(--font-size-m));
    }
    .period-container {
      gap: var(--margin-xs);
    }

    .period-container > svg, .job-meta svg {
      width: 14px;
      height: 14px;
      color: var(--accent);
    }

    h2 {
      color: var(--color-font-bright);
      letter-spacing: var(--letter-spacing-header);
      max-width: 300px;
      margin-bottom: var(--margin-xs);
    }

    .job-meta {
      gap: var(--margin-m);
    }
    .job-meta > div {
      display: flex;
      gap: 2px;
      align-items: center;
      font-size: var(--font-size-s);
      color: var(--color-font-dark);
      line-height: calc(var(--line-height-para-ratio) * var(--font-size-s));
    }
    .job-meta a {
      color: var(--color-font-dark);
      text-decoration: none;
      border-bottom: 1px solid var(--accent);
    }

    .tech-stack {
      grid-column: 1 / span 1;
      grid-row: 1 / span 1;
      align-self: center;
      justify-self: center;
      width: 300px;
      height: fit-content;
      color: var(--color-font-dark);
      -webkit-mask: -webkit-linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
      mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
      overflow: hidden;
      margin-bottom: var(--margin-m);
      border: 1px solid var(--color-font-dark);
    }
    .tech-stack .inner-scroller {
      min-width: fit-content;
      height: 100%;
      display: flex;
      align-items: center;
      gap: var(--margin-xs);
      animation: scroll 21s linear infinite;
    }
    .tech-stack .inner-scroller span {
      font-size: var(--font-size-xs);
      color: var(--color-font-dark);
      padding-block: var(--margin-xs);
      text-wrap: nowrap;
      width: fit-content;
    }

    .job-desc {
      grid-column: 2 / span 1;
      grid-row: 2 / span 1;
      align-self: start;
      justify-self: start;
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .job-desc li {
      font-size: var(--font-size-s);
      line-height: calc(var(--line-height-para-ratio) * var(--font-size-m));
      color: var(--color-font-dark);
      margin-bottom: var(--margin-xs);
      width: 90%;
    }

    .image-container {
      grid-column: 1 / span 1;
      grid-row: 2 / span 1;
      align-self: center;
      justify-self: center;
      width: 400px;
      height: 225px;
      position: relative;
      border-radius: 5px;
      opacity: .9;
    }
    .image-container > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: inherit;
    }

    @keyframes scroll {
      to {
        transform: translateX(calc(-50% - var(--margin-xs) / 2));
      }
    }

    @media (max-width: 768px) {
      :host {
        height: 100dvh;
        grid-template-columns: 1fr;
        grid-template-rows: max-content max-content max-content max-content;
        gap: var(--margin-m);
      }

      .meta {
        grid-column: 1 / span 1;
        justify-self: center;
        align-self: center;
        width: 90vw;
        max-width: 400px;
        margin-bottom: unset;
      }

      .job-meta {
        gap: var(--margin-s);
      }

      .tech-stack {
        grid-column: 1 / span 1;
        grid-row: 2 / span 1;
        justify-self: center;
        align-self: center;
        width: 90vw;
        max-width: 400px;
        margin-bottom: unset;
      }

      .job-desc {
        grid-column: 1 / span 1;
        grid-row: 3 / span 1;
        justify-self: center;
        align-self: center;
        width: 90vw;
      }

      .image-container {
        display: none;
      }
    }
  `]
})
export class CompanyCardComponent {

  @Input({required: true})
  data!: CompanyCardData
}
