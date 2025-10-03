import {AfterViewInit, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {SquareBoarderMouseFollowerComponent} from "../utils/square-boarder-mouse-follower.component";
import {TextScrambleComponent} from "../utils/text-scramble.compontent";
import {ElementAnimatorComponent} from "../utils/element-animator.component";


@Component({
  selector: 'hero',
  standalone: true,
  imports: [
    SquareBoarderMouseFollowerComponent,
    TextScrambleComponent,
    ElementAnimatorComponent
  ],
  template: `
    <leo-element-animator
        triggerMode="scroll"
        animation="fade-out"
        scrollTriggerStart="bottom 75%"
        scrollTriggerEnd="bottom 75%"
        toggleAction="play none reverse none"
        [trigger]="el"
    >
      <div class="text-container">
        <p id="p-one">Hello, my name is</p>
        <h1 id="name">Andrin Fassbind</h1>
        <h1 id="title">
          I'm a Software
          <leo-scramble-text
            #textRef
            triggerMode="manual"
            text="Engineer"
            [tweenLength]="true"
            (animationComplete)="onComplete()"
            (animationReverseComplete)="onReverseComplete()"
          >Developer</leo-scramble-text>
        </h1>
        <p id="p-two">
          Whether it's at work or in my free time, I deeply value the moments I spend working on projects or diving into programming books. With my passion for programming, I can genuinely say, "I never work a day in my life - it's what I love to do."
        </p>
      </div>
    </leo-element-animator>
    <div class="con">
      <leo-square-boarder-mouse-follower squareBackgroundColor="var(--color-background-primary)" [initialPosition]="initialPositionSquares"/>
    </div>
  `,
  styles: [`
    :host {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .text-container {
        width: 480px;
    }

    #p-one {
      font-size: var(--font-size-s);
      color: var(--accent);
      line-height: calc(var(--line-height-para-ratio) * var(--font-size-s));
      margin-bottom: var(--margin-xs);
    }

    #p-two {
      font-size: var(--font-size-s);
      color: var(--color-font-dark);
      line-height: calc(var(--line-height-para-ratio) * var(--font-size-s));
      margin-top: var(--margin-m);
    }

    h2 {
      letter-spacing: var(--letter-spacing-header);
    }

    #name {
      color: var(--color-font-dark);
    }

    #title {
      color: var(--color-font-bright);
      display: flex;
    }

    #title > * {
        margin-left: var(--margin-xs);
    }

    .con {
      position: absolute;
      width: 100vw;
      height: 100vh;
    }

    @media(max-width: 768px) {
      .text-container {
        width: 80vw;
      }
      #title {
        flex-direction: column;
      }
      #title > * {
        margin-left: 0;
      }
    }

    @media(max-width: 364px) {
      #title {
        display: block;
      }
      #title > * {
        margin-left: 0;
      }
    }

  `]
})
export class HeroComponent implements AfterViewInit {

  protected el = inject(ElementRef) as any
  protected initialPositionSquares = {x: window.innerWidth * .75, y: window.innerHeight * .25}

  @ViewChild('textRef', {read: TextScrambleComponent})
  textRef!: TextScrambleComponent

  ngAfterViewInit(): void {
    setTimeout(() => this.textRef.play(), 1500)
  }

  onComplete() {
    setTimeout(() => this.textRef.reverse(), 1500)
  }

  onReverseComplete() {
    setTimeout(() => this.textRef.play(), 1500)
  }
}
