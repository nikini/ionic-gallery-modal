import { Component, ViewChild } from '@angular/core';
import { ViewController, NavParams, Slides, Content } from 'ionic-angular';
import { Photo } from '../interfaces/photo-interface';

@Component({
  selector: 'gallery-modal',
  templateUrl: 'gallery-modal.html',
  styleUrls: ['./gallery-modal.scss'],
})
export class GalleryModal {
  @ViewChild('slider') slider: Slides;
  @ViewChild('content') content: Content;

  public photos: Photo[];
  private sliderDisabled: boolean = false;
  private swiper: any;
  private initialSlide: number = 0;
  private currentSlide: number = 0;
  private sliderLoaded: boolean = false;
  private slideOptions: any = {};
  private closeIcon: string = 'arrow-back';

  constructor(private viewCtrl: ViewController, params: NavParams) {
    this.photos = params.get('photos') || [];
    this.closeIcon = params.get('closeIcon') || 'arrow-back';
    this.initialSlide = params.get('initialSlide') || 0;
    this.slideOptions.initialSlide = this.initialSlide;
  }

  /**
   * Closes the modal (when user click on CLOSE)
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }

  /**
   * When the modal has entered into view
   */
  private ionViewDidEnter() {
    this.sliderLoaded = true;
  }

  /**
   * Disables the scroll through the slider
   *
   * @param  {Event} event
   */
  private disableScroll(event) {
    if (!this.sliderDisabled) {
      this.swiper = this.slider.getSlider();
      this.currentSlide = this.swiper.activeIndex;
      this.swiper.destroy(false);
      this.sliderDisabled = true;
    }
  }

  /**
   * Enables the scroll through the slider
   *
   * @param  {Event} event
   */
  private enableScroll(event) {
    if (this.sliderDisabled) {
      this.swiper = this.slider.getSlider();
      this.swiper.init();
      this.swiper.slideTo(this.currentSlide, 0, false);
      this.sliderDisabled = false;
    }
  }
}
