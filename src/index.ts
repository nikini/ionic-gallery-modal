import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { FittedImage } from './fitted-image/fitted-image';
import { ZoomableImage } from './zoomable-image/zoomable-image';
import { GalleryModal } from './gallery-modal/gallery-modal';

import { TouchEventsDirective } from './directives/touch-events';

import { GalleryModalHammerConfig } from './overrides/gallery-modal-hammer-config';

@NgModule({
  imports: [
    CommonModule,
    IonicPageModule.forChild(TouchEventsDirective),
    IonicPageModule.forChild(FittedImage),
    IonicPageModule.forChild(ZoomableImage),
    IonicPageModule.forChild(GalleryModal),
  ],
  declarations: [
    FittedImage,
    ZoomableImage,
    GalleryModal,
    TouchEventsDirective,
  ],
  exports: [
    FittedImage,
    ZoomableImage,
    GalleryModal,
    TouchEventsDirective,
  ],
  entryComponents: [
    GalleryModal,
  ],
})
export class GalleryModalModule {}
export { FittedImage, ZoomableImage, GalleryModal, GalleryModalHammerConfig, TouchEventsDirective }
