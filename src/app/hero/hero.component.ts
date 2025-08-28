import { Component } from '@angular/core';
import {PageProgressComponent} from "../nav/progress-indicator/page-progress.component";
import {SquareBoarderMouseFollowerComponent} from "../../../../../../library-workspace/dist/leo-ui-styles";

@Component({
  selector: 'hero',
  standalone: true,
  imports: [
    PageProgressComponent,
    SquareBoarderMouseFollowerComponent
  ],
  template: `
    <div class="con">
      <leo-square-boarder-mouse-follower squareBackgroundColor="var(--color-background-primary)"/>
    </div>
  `,
  styles: [`
    :host {
      width: 100vw;
      height: 100vh;
      display: block;
      scroll-snap-align: start;
    }

    .con {
      position: absolute;
      width: 100vw;
      height: 100vh;
    }
  `]
})
export class HeroComponent {

}
