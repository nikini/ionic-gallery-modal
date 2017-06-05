import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { ZoomableImage } from './zoomable-image/zoomable-image';
import { GalleryModal } from './gallery-modal/gallery-modal';

import { TouchEventsDirective } from './directives/touch-events';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(TouchEventsDirective),
    IonicModule.forRoot(ZoomableImage),
    IonicModule.forRoot(GalleryModal),
  ],
  declarations: [
    ZoomableImage,
    GalleryModal,
    TouchEventsDirective,
  ],
  exports: [
    ZoomableImage,
    GalleryModal,
  ],
  entryComponents: [
    GalleryModal,
  ],
})
export class GalleryModalModule {}
export { ZoomableImage, GalleryModal }
