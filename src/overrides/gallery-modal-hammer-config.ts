import { HammerGestureConfig } from '@angular/platform-browser';

export class GalleryModalHammerConfig extends HammerGestureConfig {
  public overrides = {
    pan: {
      direction: 30,
    },
    press: {
      time: 300,
    },
  }
}
