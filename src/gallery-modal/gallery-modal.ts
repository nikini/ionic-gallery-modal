import { Component, ViewChild, ElementRef } from '@angular/core';
import { ViewController, NavParams, Slides, Content, Platform } from 'ionic-angular';
import { Photo } from '../interfaces/photo-interface';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'gallery-modal',
  templateUrl: './gallery-modal.html',
  styleUrls: ['./gallery-modal.scss'],
})
export class GalleryModal {
  @ViewChild('slider') slider: Slides;
  @ViewChild('content') content: Content;

  public photos: Photo[];
  private sliderDisabled: boolean = false;
  private initialSlide: number = 0;
  private currentSlide: number = 0;
  private sliderLoaded: boolean = false;
  private closeIcon: string = 'arrow-back';
  private parentSubject: Subject<any> = new Subject();

  private width: number = 0;
  private height: number = 0;

  private slidesStyle: any = {
    visibility: 'hidden',
  };
  private modalStyle: any = {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  };

  constructor(private viewCtrl: ViewController, params: NavParams, private element: ElementRef, private platform: Platform) {
    this.photos = params.get('photos') || [];
    this.closeIcon = params.get('closeIcon') || 'arrow-back';
    this.initialSlide = params.get('initialSlide') || 0;
  }

  /**
   * Closes the modal (when user click on CLOSE)
   */
  public dismiss() {
    this.viewCtrl.dismiss();
  }

  private resize(event) {
    this.slider.update();

    this.width = this.element.nativeElement.offsetWidth;
    this.height = this.element.nativeElement.offsetHeight;

    this.parentSubject.next({
      width: this.width,
      height: this.height,
    });
  }

  private orientationChange(event) {
    // TODO: See if you can remove timeout
    window.setTimeout(() => {
      this.resize(event);
    }, 150);
  }

  /**
   * When the modal has entered into view
   */
  private ionViewDidEnter() {
    this.resize(false);
    this.sliderLoaded = true;
    this.slidesStyle.visibility = 'visible';
  }

  /**
   * Disables the scroll through the slider
   *
   * @param  {Event} event
   */
  private disableScroll(event) {
    if (!this.sliderDisabled) {
      this.currentSlide = this.slider.getActiveIndex();
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
      this.slider.slideTo(this.currentSlide, 0, false);
      this.sliderDisabled = false;
    }
  }

  /**
   * Called when the user pans up/down
   *
   * @param  {Hammer.Event} event
   */
  private panUpDownEvent(event) {
    let ratio = (event.distance / (this.height / 2));
    if (ratio > 1) {
      ratio = 1;
    } else if (ratio < 0) {
      ratio = 0;
    }
    const scale = 1 - (ratio * 0.2);
    const opacity = 1 - (ratio * 0.2);
    const backgroundOpacity = 1 - (ratio * 0.8);

    this.slidesStyle.transform = `translate(0, ${event.deltaY}px) scale(${scale})`;
    this.slidesStyle.opacity = opacity;
    this.modalStyle.backgroundColor = `rgba(0, 0, 0, ${backgroundOpacity})`;
  }

  /**
   * Called when the user stopped panning up/down
   *
   * @param  {Hammer.Event} event
   */
  private panEndEvent(event) {
    this.slidesStyle.transform = 'none';
    this.slidesStyle.opacity = 1;
    this.modalStyle.backgroundColor = 'rgba(0, 0, 0, 1)';
  }
}
