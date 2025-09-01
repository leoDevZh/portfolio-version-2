import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileEvaluationService {

  get isMobil(): boolean {
    return window.innerWidth < 768
  }
}
