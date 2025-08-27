import {Component, Input} from "@angular/core";
import {ProgressIndicatorRopeComponent} from "./progress-indicator-rope.component";

@Component({
  selector: 'page-progress',
  standalone: true,
  imports: [
    ProgressIndicatorRopeComponent
  ],
  template: `
    <span>Home</span>
    <span>Work</span>
    <span>Projects</span>
    <span>Education</span>
    <div class="rope-container">
      <progress-indicator-rope
        class="idc"
        displayConnector="LEFT"
      />
      <progress-indicator-rope
        class="idc"
        displayConnector="BOTH"
      />
      <progress-indicator-rope
        class="idc"
        displayConnector="BOTH"
      />
    </div>
  `,
  styles: [`
    :host {
      position: relative;
      width: 30vw;
      height: 50px;
    }

    span {
      position: absolute;
      font-size: var(--font-size-xs);
      color: var(--color-font-dark);
      transform: translateX(-50%);
    }

    span:nth-child(2) {
      left: 33%;
    }

    span:nth-child(3) {
      left: 66%;
    }

    span:nth-child(4) {
      left: 100%;
    }

    .rope-container {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: row;
    }

    .idc {
      width: 33.33%;
    }
  `]
})
export class PageProgressComponent {
  @Input()
  activeIdx: number = 0

}
