import { Injectable } from '@angular/core';
import { HammerGestureConfig } from "@angular/platform-browser";

@Injectable()
export class HammerService extends HammerGestureConfig {
  buildHammer(elem: HTMLElement){
    const mc = new (<any>window).Hammer(elem);
    for(const eventName in this.overrides){
      if(eventName){
        mc.get(eventName).set(this.overrides[eventName]);
      }
    }
    return mc;
  }
}
