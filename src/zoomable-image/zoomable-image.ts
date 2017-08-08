import { Component, OnInit, OnDestroy, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { ViewController, Scroll } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'zoomable-image',
  templateUrl: './zoomable-image.html',
  styleUrls: ['./zoomable-image.scss'],
})
export class ZoomableImage implements OnInit, OnDestroy {
  @ViewChild('ionScrollContainer', { read: ElementRef }) ionScrollContainer: ElementRef;

  @Input() photo: any;
  @Input() resizeTriggerer: Subject<any>;
  @Input() wrapperWidth: number;
  @Input() wrapperHeight: number;

  @Output() disableScroll = new EventEmitter();
  @Output() enableScroll = new EventEmitter();
  @Output() zoomChange = new EventEmitter();

  private scrollableElement: any;
  private scrollListener: any;

  private scale: number = 1;
  private scaleStart: number = 1;

  private maxScale: number = 3;
  private minScale: number = 1;
  private minScaleBounce: number = 0.2;
  private maxScaleBounce: number = 0.35;

  private imageWidth: number = 0;
  private imageHeight: number = 0;

  private originalSize: any = {
    width: 0,
    height: 0,
  };

  private position: any = {
    x: 0,
    y: 0,
  };
  private scroll: any = {
    x: 0,
    y: 0,
  };
  private centerRatio: any = {
    x: 0,
    y: 0,
  };
  private centerStart: any = {
    x: 0,
    y: 0,
  };
  private panCenterStart = {
    x: 0, y: 0,
  };

  private containerStyle: any = {};
  private imageStyle: any = {};
  private resizeSubscription: any;

  constructor() {
  }

  public ngOnInit() {
    // Get the scrollable element
    this.scrollableElement = this.ionScrollContainer.nativeElement.querySelector('.scroll-content');

    // Attach events
    this.attachEvents();

    // Listen to parent resize
    this.resizeSubscription = this.resizeTriggerer.subscribe(event => {
      this.resize(event);
    });
  }

  public ngOnDestroy() {
    this.scrollableElement.removeEventListener('scroll', this.scrollListener);
    this.resizeSubscription.unsubscribe();
  }

  /**
   * Attach the events to the items
   */
  private attachEvents() {
    // Scroll event
    this.scrollListener = this.scrollEvent.bind(this);
    this.scrollableElement.addEventListener('scroll', this.scrollListener);
  }

  /**
   * Called every time the window gets resized
   */
  public resize(event) {
    // Get the image dimensions
    this.saveImageDimensions();
  }

  /**
   * Called when the image has dimensions
   *
   * @param  {Object} dimensions
   */
  handleImageResized(dimensions) {
    this.imageWidth = dimensions.width;
    this.imageHeight = dimensions.height;

    this.originalSize.width = dimensions.originalWidth;
    this.originalSize.height = dimensions.originalHeight;

    this.saveImageDimensions();
  }

  /**
   * Save the image dimensions (when it has the image)
   */
  private saveImageDimensions() {
    const width = this.originalSize.width;
    const height = this.originalSize.height;

    this.maxScale = Math.max(width / this.imageWidth - this.maxScaleBounce, 1);

    this.displayScale();
  }

  /**
   * While the user is pinching
   *
   * @param  {Hammer.Event} event
   */
  private pinchEvent(event) {
    let scale = this.scaleStart * event.scale;

    if (scale > this.maxScale) {
      scale = this.maxScale + (1 - this.maxScale / scale) * this.maxScaleBounce;
    } else if (scale < this.minScale) {
      scale = this.minScale - (1 - scale / this.minScale) * this.minScaleBounce;
    }

    this.scale = scale;
    this.displayScale();

    this.zoomChange.emit({
      scale: this.scale,
    });

    event.preventDefault();
  }

  /**
   * When the user starts pinching
   *
   * @param  {Hammer.Event} event
   */
  private pinchStartEvent(event) {
    this.scaleStart = this.scale;
    this.setCenter(event);
  }

  /**
   * When the user stops pinching
   *
   * @param  {Hammer.Event} event
   */
  private pinchEndEvent(event) {
    this.checkScroll();

    if (this.scale > this.maxScale) {
      this.animateScale(this.maxScale);

      this.zoomChange.emit({
        scale: this.maxScale,
      });
    } else if (this.scale < this.minScale) {
      this.animateScale(this.minScale);

      this.zoomChange.emit({
        scale: this.minScale,
      });
    } else {
      this.zoomChange.emit({
        scale: this.scale,
      });
    }
  }

  /**
   * When the user double taps on the photo
   *
   * @param  {Hammer.Event} event
   */
  private doubleTapEvent(event) {
    this.setCenter(event);

    let scale = this.scale > 1 ? 1 : 2.5;
    if (scale > this.maxScale) {
      scale = this.maxScale;
    }

    this.zoomChange.emit({
      scale: scale,
    });

    this.animateScale(scale);
  }

  /**
   * Called when the user is panning
   *
   * @param  {Hammer.Event} event
   */
  private panEvent(event) {
    // calculate center x,y since pan started
    const x = Math.max(Math.floor(this.panCenterStart.x + event.deltaX), 0);
    const y = Math.max(Math.floor(this.panCenterStart.y + event.deltaY), 0);

    this.centerStart.x = x;
    this.centerStart.y = y;

    if (event.isFinal) {
      this.panCenterStart.x = x;
      this.panCenterStart.y = y;
    }

    this.displayScale();
  }

  /**
   * When the user is scrolling
   *
   * @param  {Event} event
   */
  private scrollEvent(event) {
    this.scroll.x = event.target.scrollLeft;
    this.scroll.y = event.target.scrollTop;
  }

  /**
   * Set the startup center calculated on the image (along with the ratio)
   *
   * @param  {Hammer.Event} event
   */
  private setCenter(event) {
    const realImageWidth = this.imageWidth * this.scale;
    const realImageHeight = this.imageHeight * this.scale;

    this.centerStart.x = Math.max(event.center.x - this.position.x * this.scale, 0);
    this.centerStart.y = Math.max(event.center.y - this.position.y * this.scale, 0);
    this.panCenterStart.x = Math.max(event.center.x - this.position.x * this.scale, 0);
    this.panCenterStart.y = Math.max(event.center.y - this.position.y * this.scale, 0);

    this.centerRatio.x = Math.min((this.centerStart.x + this.scroll.x) / realImageWidth, 1);
    this.centerRatio.y = Math.min((this.centerStart.y + this.scroll.y) / realImageHeight, 1);
  }

  /**
   * Calculate the position and set the proper scale to the element and the
   * container
   */
  private displayScale() {
    const realImageWidth = this.imageWidth * this.scale;
    const realImageHeight = this.imageHeight * this.scale;

    this.position.x = Math.max((this.wrapperWidth - realImageWidth) / (2 * this.scale), 0);
    this.position.y = Math.max((this.wrapperHeight - realImageHeight) / (2 * this.scale), 0);

    this.imageStyle.transform = `scale(${this.scale}) translate(${this.position.x}px, ${this.position.y}px)`;
    this.containerStyle.width = `${realImageWidth}px`;
    this.containerStyle.height = `${realImageHeight}px`;

    this.scroll.x = this.centerRatio.x * realImageWidth - this.centerStart.x;
    this.scroll.y = this.centerRatio.y * realImageWidth - this.centerStart.y;

    // Set scroll of the ion scroll
    this.scrollableElement.scrollLeft = this.scroll.x;
    this.scrollableElement.scrollTop = this.scroll.y;
  }

  /**
   * Check wether to disable or enable scroll and then call the events
   */
  private checkScroll() {
    if (this.scale > 1) {
      this.disableScroll.emit({});
    } else {
      this.enableScroll.emit({});
    }
  }

  /**
   * Animates to a certain scale (with ease)
   *
   * @param  {number} scale
   */
  private animateScale(scale:number) {
    this.scale += (scale - this.scale) / 5;

    if (Math.abs(this.scale - scale) <= 0.1) {
      this.scale = scale;
    }

    this.displayScale();

    if (Math.abs(this.scale - scale) > 0.1) {
      window.requestAnimationFrame(this.animateScale.bind(this, scale));
    } else {
      this.checkScroll();
    }
  }
}
