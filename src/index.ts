import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { ZoomableImage } from './zoomable-image/zoomable-image';
import { GalleryModal } from './gallery-modal/gallery-modal';

import { TouchEventsDirective } from './directives/touch-events';

import { GalleryModalHammerConfig } from './overrides/gallery-modal-hammer-config';

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
    TouchEventsDirective,
  ],
  entryComponents: [
    GalleryModal,
  ],
})
export class GalleryModalModule {}
export { ZoomableImage, GalleryModal, GalleryModalHammerConfig, TouchEventsDirective }
