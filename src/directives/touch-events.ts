import { Directive, ElementRef, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Gesture } from 'ionic-angular';


@Directive({
  selector: '[touch-events]'
})
export class TouchEventsDirective implements OnInit, OnDestroy {
  private gestureListener: Gesture;

  @Input() direction:string = 'x';
  @Input() threshold:number = 10;

  @Output() pinch = new EventEmitter();
  @Output() pinchstart = new EventEmitter();
  @Output() pinchend = new EventEmitter();
  @Output() onpan = new EventEmitter();
  @Output() panup = new EventEmitter();
  @Output() pandown = new EventEmitter();
  @Output() panleft = new EventEmitter();
  @Output() panright = new EventEmitter();
  @Output() panend = new EventEmitter();
  @Output() pancancel = new EventEmitter();
  @Output() doubletap = new EventEmitter();

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.gestureListener = new Gesture(this.el.nativeElement, {
      domEvents: false,
      enable: true,
      direction: this.direction,
      threshold: this.threshold,
    });
    this.gestureListener.listen();
    this.gestureListener.on('pinch', (event) => {
      this.pinch.emit(event);
    });
    this.gestureListener.on('pinchstart', (event) => {
      this.pinchstart.emit(event);
    });
    this.gestureListener.on('pinchend', (event) => {
      this.pinchend.emit(event);
    });
    this.gestureListener.on('pan', (event) => {
      this.onpan.emit(event);
    });
    this.gestureListener.on('panup', (event) => {
      this.panup.emit(event);
    });
    this.gestureListener.on('pandown', (event) => {
      this.pandown.emit(event);
    });
    this.gestureListener.on('panleft', (event) => {
      this.panleft.emit(event);
    });
    this.gestureListener.on('panright', (event) => {
      this.panright.emit(event);
    });
    this.gestureListener.on('panend', (event) => {
      this.panend.emit(event);
    });
    this.gestureListener.on('pancancel', (event) => {
      this.pancancel.emit(event);
    });
    this.gestureListener.on('doubletap', (event) => {
      this.doubletap.emit(event);
    });
  }

  ngOnDestroy() {
    this.gestureListener.destroy();
  }
}
