import {Component, inject} from '@angular/core';
import {ProjectCardComponent} from "./project-card/project-card.component";
import {MobileEvaluationService} from "../utils/mobile-evaluation.service";

export type ProjectCategory = 'AI' | 'FS' | 'EDU'

@Component({
  selector: 'project',
  standalone: true,
  imports: [
    ProjectCardComponent

  ],
  template: `
    <div class="category">
      <div class="category-wrapper" [class.highlight]="category==='AI'" (click)="highlight('AI')">
        <p>{{ aiText }}</p>
      </div>
      <div class="category-wrapper" [class.highlight]="category==='FS'" (click)="highlight('FS')">
        <p>Fullstack</p>
      </div>
      <div class="category-wrapper" [class.highlight]="category==='EDU'" (click)="highlight('EDU')">
        <p>University</p>
      </div>
    </div>
    <div class="project-container">
      <project-card
        [data]="{
                title: 'Reinforcement Learning - Snake',
                techStack: ['Python', 'Pytorch', 'PyGame', 'PyPlot', 'Mathematics'],
                description: 'Fascinated about Reinforcement Learning I have implemented a RL-Framework and a RL-Environment, simulating Snake. I implemented 2 different RL-Algorithms to train a shallow neural network and compared their training and test performance.<br><br> Check out the project and observe the training of the model or the performance of my neural networks in real life. To make it even more fun everything is visualized with PyGame.',
                imgUrl: 'image/rl.jpg',
                link: 'https://github.com/leoDevZh/Snake',
                keywords: ['AI']
            }"
        [search]="category"
      />
      <project-card
        [data]="{
                title: 'Frontend - Angular UI Library',
                techStack: ['Angular', 'Git'],
                description: 'To reduce repetitive coding I started to create a custom UI Library for my Angular projects.<br><br>I have not only gained more efficiency but also gained a lot of know how in Angular.',
                imgUrl: 'image/angularUi.jpg',
                keywords: ['FS']
            }"
        [search]="category"
      />
      <project-card
        [data]="{
                title: 'Fullstack - Boatsharing Application',
                techStack: ['Angular', 'Spring', 'JUnit', 'SQL', 'DataJPA', 'Docker', 'Nginx', 'Linux', 'Git'],
                description: 'Together with my friends we share a boat, therefore we had the need to organise boat reservations and payments. <br> Using my Spring and Angular skills I targeted our need... and succeeded.<br><br>One of the more interesting parts of the Application is the Security implementations using JWT and the Integrationtest setup with Context and Testcontainers.<br>The domain also required some SQL-Transaction handling to respect ACID. To make the code more maintainable, DDD and Hexagonal architecture ideas have been used.',
                imgUrl: 'image/boatsharing.png',
                link: 'https://github.com/leoDevZh/BoatSharing',
                keywords: ['FS']
            }"
        [search]="category"
      />
      <project-card
        [data]="{
                title: 'Frontend - Portfolio v1',
                techStack: ['HTML', 'CSS', 'JS', 'WebPack', 'GSAP'],
                description: 'Enthusiastic about web design I created a responsive web design for my portfolio.<br><br>Using Webpack for developing and bundling improved overall efficiency and performance.',
                imgUrl: 'image/portfolioV1.png',
                link: 'https://github.com/leoDevZh/my-portfolio',
                keywords: ['FS']
            }"
        [search]="category"
      />
      <project-card
        [data]="{
                title: 'Frontend - Portfolio v2',
                techStack: ['Angular', 'CSS', 'Typescript', 'Nginx', 'Linux', 'GSAP'],
                description: 'After improving my skills in Frontend development I wanted to bring my Portfolio to the next stage.<br><br>With this project I took a step in the right direction.',
                imgUrl: 'image/portfolioV2.png',
                link: 'https://github.com/leoDevZh/portfolio-version-2',
                keywords: ['FS']
            }"
        [search]="category"
      />
      <project-card
        [data]="{
                title: 'Bachelor Thesis - Prosodic Feature Modeling',
                techStack: ['Pytorch', 'Python', 'Mathematics', 'Docker', 'Linux'],
                description: 'Challenging 3 years of my Computer Science Bachelor came to an end. And with that I had the opportunity to do my research in prosodic feature modelling. Together with my fellow student Fabian Bosshard.<br><br>Having the privilege to be mentored by Prof. Dr. Thilo Stadelmann I could level up my theoretical knowledge in Neural Networks by decades. With access to the computer infrastructure from the ZhaW Centre for Artificial Intelligence it even was fun.',
                imgUrl: 'image/thesis.png',
                link: 'https://www.zhaw.ch/storage/engineering/institute-zentren/cai/studentische_arbeiten/Spring_2024/BA_FS24_Bosshard-Fassbind_Prosodic-Feature-Modelling.pdf',
                keywords: ['AI', 'EDU']
            }"
        [search]="category"
      />
      <project-card
        [data]="{
                title: 'LLM - CodeMate',
                techStack: ['OpenAI API', 'Python', 'Git'],
                description: 'Together with a fellow student we could do a project where we dove deeper in LLMs by implementing a Python Client that can access local files and use them as prompts for more specific LLM support.',
                imgUrl: 'image/chatbot.jpg',
                keywords: ['AI', 'EDU']
            }"
        [search]="category"
      />

    </div>
  `,
  styles: [`
    :host {
      background: var(--color-background-primary);
      display: grid;
      width: 100vw;
      min-height: 100vh;
      grid-template-columns: 1fr 1fr;
      overflow-x: hidden;
      margin-top: var(--margin-xl);
    }

    .category {
      display: flex;
      flex-direction: column;
      gap: var(--margin-s);
      position: relative;
      width: 90%;
      height: fit-content;
      justify-self: end;
    }

    .category-wrapper {
      position: relative;
      width: 100%;
      height: 24px;
      max-width: 300px;
      border-bottom: 1px solid transparent;
      background: linear-gradient(var(--color-background-primary), var(--color-background-primary)) padding-box,
      linear-gradient(90deg, var(--accent) 0%, var(--color-font-bright) var(--accent-percentage-category)) border-box;
      -webkit-mask: -webkit-linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
      mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
      margin-bottom: var(--margin-s);
      cursor: pointer;
    }

    .category-wrapper:hover {
      --accent-percentage-category: 50%;
    }
    .category-wrapper.highlight {
      --accent-percentage-category: 50%;
    }

    .category-wrapper p {
      position: absolute;
      width: fit-content;
      left: 20%;
      color: var(--color-font-bright);
      font-size: var(--font-size-m);
      font-weight: 100;
      transition: transform .2s ease;
    }

    .project-container {
      display: flex;
      flex-direction: column;
      justify-content: start;
      gap: var(--margin-m);
    }

    @property --accent-percentage-category {
      syntax: "<percentage>";
      inherits: false;
      initial-value: 0%;
    }

    @media(min-width: 600px) {
      .category-wrapper {
        transition: --accent-percentage-category .2s ease
      }
      .category-wrapper:hover p {
        transform: translateX(2px);
      }
    }

    @media(max-width: 600px) {
      :host {
        display: block;
      }

      .category {
        width: 100%;
        flex-direction: row;
        justify-content: space-evenly;
        margin-bottom: var(--margin-m);
      }

      .category-wrapper {
        max-width: 90px;
        width: 25%;
        height: 40px;
        position: relative;
      }

      .category-wrapper p {
        bottom: var(--margin-xs);
        left: 50%;
        transform: translateX(-50%);
        color: var(--color-font-bright);
        font-size: var(--font-size-xs);
        font-weight: 100;
      }

      .project-container {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  `]
})
export class ProjectComponent {

  protected category?: ProjectCategory

  private isMobil =  inject(MobileEvaluationService).isMobil

  get aiText() {
    return this.isMobil ? 'AI' : 'Artificial Intelligence'
  }

  highlight(category: ProjectCategory) {
    this.category = category
  }
}
